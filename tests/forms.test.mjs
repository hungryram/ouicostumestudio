import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const testDirectory = dirname(fileURLToPath(import.meta.url));

function loadModule(file, dependencies, globals = {}) {
  const source = readFileSync(join(testDirectory, "..", ...file.split("/")), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  new Function("exports", "require", ...Object.keys(globals), code)(
    exports,
    (name) => {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    ...Object.values(globals),
  );
  return exports;
}

test("Sheets config reads the renamed credentials and expands key newlines", () => {
  const env = {
    SHEETS_CLIENT_EMAIL: " test@example.com ",
    SHEETS_PRIVATE_KEY: "first\\nsecond",
    GOOGLE_WAITLIST_SPREADSHEET_ID: " sheet-id ",
    GOOGLE_WAITLIST_RANGE: " 'Waitlist'!A:G ",
  };
  const sheet = loadModule("app/lib/waitlist-sheet.ts", {
    "google-auth-library": { JWT: class {} },
  }, { process: { env } });
  assert.deepEqual(sheet.getWaitlistSheetConfig(), {
    clientEmail: "test@example.com",
    privateKey: "first\nsecond",
    spreadsheetId: "sheet-id",
    range: "'Waitlist'!A:G",
  });
  assert.equal(sheet.getContactSheetConfig().range, "'Contact'!A:D");
  env.GOOGLE_CONTACT_RANGE = " 'Messages'!A:D ";
  assert.equal(sheet.getContactSheetConfig().range, "'Messages'!A:D");
  delete env.SHEETS_PRIVATE_KEY;
  assert.equal(sheet.getWaitlistSheetConfig(), null);
  assert.equal(sheet.getContactSheetConfig(), null);
});

function harness({ sheetConfigured = true, sheetFails = false, studioFails = false,
  confirmationFails = false, spam = false, crmFails = false, crmThrows = false,
  crmUrl = "https://app.hungryhub.io/api/public/forms/test?secret=test-secret" } = {}) {
  const events = [];
  const emails = [];
  const logs = [];
  const leads = [];
  const sheet = {
    getWaitlistSheetConfig: () => sheetConfigured ? {} : null,
    getContactSheetConfig: () => sheetConfigured ? {} : null,
    appendContactEntry: async (_, entry) => {
      events.push("contact-sheet");
      if (sheetFails) throw new Error("Simulated save failure");
      assert.equal(entry.message, "=1+1");
      assert.equal(entry.email, "alex@example.com");
      assert.equal(entry.projectFormat, undefined);
    },
    appendWaitlistEntry: async (_, entry) => {
      events.push("sheet");
      if (sheetFails) throw new Error("Simulated save failure");
      assert.equal(entry.projectFormat, "Solo");
      assert.equal(entry.message, "=1+1");
    },
  };
  const handler = loadModule("app/lib/form-submission.ts", { "./waitlist-sheet": sheet }, {
    process: { env: {
      POSTMARK_SERVER_TOKEN: "test",
      POSTMARK_FROM_EMAIL: "sender@example.com",
      CONTACT_TO_EMAIL: "studio@example.com, second@example.com",
      TURNSTILE_SECRET_KEY: "test",
      HUNGRYHUB_FORM_URL: crmUrl,
    } },
    console: { warn: (...args) => logs.push(args), error: (...args) => logs.push(args) },
    fetch: async (url, options) => {
      if (url.includes("siteverify")) {
        events.push("verify");
        return Response.json({ success: !spam });
      }
      if (url.startsWith("https://app.hungryhub.io/")) {
        events.push("crm");
        leads.push(JSON.parse(options.body));
        assert.equal(options.method, "POST");
        assert.equal(options.headers["Content-Type"], "application/json");
        assert.equal(options.redirect, "error");
        assert.ok(options.signal instanceof AbortSignal);
        if (crmThrows) throw new Error(`Request failed: ${url}`);
        return Response.json({ success: !crmFails }, { status: crmFails ? 503 : 200 });
      }
      const email = JSON.parse(options.body);
      emails.push(email);
      const studio = email.To.includes("studio@");
      events.push(studio ? "studio" : "confirmation");
      const fails = studio ? studioFails : confirmationFails;
      return Response.json({ ErrorCode: fails ? 422 : 0 }, { status: fails ? 422 : 200 });
    },
  });
  return {
    events, emails, logs, leads,
    async submit(waitlist, overrides = {}) {
      return handler.handleFormSubmission(new Request("http://localhost/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Alex <Test>", email: "alex@example.com", message: "=1+1",
          projectType: "Jazz", projectFormat: "Solo",
          turnstileToken: "test", ...overrides,
        }),
      }), waitlist);
    },
  };
}

test("general contact saves separately before emails and does not claim waitlist enrollment", async () => {
  const h = harness();
  const response = await h.submit(false, {
    projectType: undefined, projectFormat: undefined,
  });
  assert.equal(response.status, 200);
  assert.deepEqual(h.events, ["verify", "contact-sheet", "crm", "studio", "confirmation"]);
  assert.deepEqual(h.leads, [{
    name: "Alex <Test>", email: "alex@example.com", message: "=1+1",
    source: "General",
  }]);
  assert.match(h.emails[0].Subject, /New Contact Message/);
  assert.doesNotMatch(h.emails[0].HtmlBody, />Format</);
  assert.match(h.emails[1].TextBody, /does not add you to the waitlist/);
});

test("waitlist saves first and sends branded waitlist emails", async () => {
  const h = harness();
  const response = await h.submit(true);
  assert.deepEqual(await response.json(), {
    sent: true, confirmationSent: true, studioNotificationSent: true, crmSent: true,
  });
  assert.deepEqual(h.events, ["verify", "sheet", "crm", "studio", "confirmation"]);
  assert.deepEqual(h.leads, [{
    name: "Alex <Test>", email: "alex@example.com", message: "=1+1",
    source: "Waitlist",
    type_of_project: "Jazz", group_or_solo: "Solo", price_range: "", project_details: "=1+1",
  }]);
  assert.equal(h.emails[0].To, "studio@example.com, second@example.com");
  assert.match(h.emails[0].Subject, /New Waitlist Entry/);
  assert.match(h.emails[0].TextBody, /Format: Solo/);
  assert.equal(h.emails[1].To, "alex@example.com");
  assert.match(h.emails[1].Subject, /waitlist/);
  for (const body of [h.emails[1].TextBody, h.emails[1].HtmlBody]) {
    assert.match(body, /Space will be limited/);
    assert.match(body, /let you know whether I can take on your project/);
    assert.doesNotMatch(body, /does not reserve|guarantee availability/);
  }
  for (const email of h.emails) {
    assert.match(email.HtmlBody, /Alex &lt;Test&gt;/);
    assert.match(email.HtmlBody, /href="https:\/\/www.hungryram.com"/);
    assert.match(email.HtmlBody, /background:#0c0b0d/);
    assert.doesNotMatch(email.HtmlBody, /#69445d|#bd8496|#f1dce4/);
  }
  assert.match(h.emails[0].HtmlBody, /background:#171417/);
});

test("both forms reject missing Sheets config and unconfirmed saves without sending mail", async () => {
  for (const waitlist of [false, true]) {
    for (const options of [{ sheetConfigured: false }, { sheetFails: true }]) {
      const h = harness(options);
      const response = await h.submit(waitlist);
      assert.ok(response.status >= 500);
      assert.equal(h.emails.length, 0);
      assert.equal(h.leads.length, 0);
      assert.ok(h.logs.length);
    }
  }
});

test("both forms remain accepted after saving if either email fails", async () => {
  for (const waitlist of [false, true]) {
    for (const options of [{ studioFails: true }, { confirmationFails: true }]) {
      const h = harness(options);
      const response = await h.submit(waitlist);
      assert.equal(response.status, 200);
      const result = await response.json();
      assert.equal(result.sent, true);
      assert.equal(result.studioNotificationSent, !options.studioFails);
      assert.equal(result.confirmationSent, !options.confirmationFails);
      assert.equal(result.crmSent, true);
      assert.equal(h.events.filter((event) => event === (waitlist ? "sheet" : "contact-sheet")).length, 1);
      assert.ok(h.logs.length);
    }
  }
});

test("spam and invalid fields do not save rows or send emails", async () => {
  for (const [options, overrides] of [
    [{ spam: true }, {}], [{}, { projectFormat: "Invalid" }], [{}, { hp_extra: "bot" }],
  ]) {
    const h = harness(options);
    const response = await h.submit(true, overrides);
    assert.equal(response.status, 400);
    assert.ok(!h.events.includes("sheet"));
    assert.equal(h.emails.length, 0);
    assert.equal(h.leads.length, 0);
  }
});

test("CRM failures preserve saved submissions and emails, with sanitized operator warnings", async () => {
  for (const waitlist of [false, true]) {
    for (const options of [
      { crmFails: true }, { crmThrows: true }, { crmUrl: "" },
      { crmUrl: "https://example.com/api/public/forms/test?secret=test-secret" },
      { crmUrl: "invalid-url-test-secret" },
    ]) {
      const h = harness(options);
      const response = await h.submit(waitlist);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), {
        sent: true, confirmationSent: true, studioNotificationSent: true, crmSent: false,
      });
      assert.equal(h.emails.length, 2);
      assert.ok(h.events.includes(waitlist ? "sheet" : "contact-sheet"));
      assert.ok(h.events.filter((event) => event === "crm").length <= 1);
      assert.match(h.emails[0].TextBody, /CRM sync could not be confirmed/);
      assert.match(h.emails[0].HtmlBody, /CRM sync could not be confirmed/);
      assert.ok(h.logs.length);
      assert.doesNotMatch(JSON.stringify(h.logs), /test-secret/);
    }
  }
});

test("waitlist CRM fields retain the selected project, format, and price range", async () => {
  const h = harness();
  const priceRange = `$350${String.fromCharCode(0x2013)}$500`;
  await h.submit(true, { priceRange });
  assert.equal(h.leads[0].price_range, priceRange);
  assert.equal(h.leads[0].type_of_project, "Jazz");
  assert.equal(h.leads[0].group_or_solo, "Solo");
  assert.equal(h.leads[0].project_details, "=1+1");
});

test("Sheets uses RAW values, no retries, and distinct seven- and four-column tabs", async () => {
  const rows = [];
  const sheet = loadModule("app/lib/waitlist-sheet.ts", {
    "google-auth-library": {
      JWT: class {
        constructor(options) {
          assert.deepEqual(options.scopes, ["https://www.googleapis.com/auth/spreadsheets"]);
        }
        async request(options) {
          assert.match(options.url, /valueInputOption=RAW/);
          assert.equal(options.retry, false);
          rows.push(options);
          return { data: { updates: { updatedRows: 1 } } };
        }
      },
    },
  });
  await sheet.appendWaitlistEntry({
    clientEmail: "test@example.com", privateKey: "test", spreadsheetId: "test", range: "'Waitlist'!A:G",
  }, { name: "Alex", email: "alex@example.com", projectType: "Jazz",
    projectFormat: "Solo", priceRange: "", message: "=1+1" });
  await sheet.appendContactEntry({
    clientEmail: "test@example.com", privateKey: "test", spreadsheetId: "test", range: "'Contact'!A:D",
  }, { name: "Alex", email: "alex@example.com", message: "=1+1" });
  assert.equal(rows[0].data.values[0].length, 7);
  assert.equal(rows[0].data.values[0][6], "=1+1");
  assert.equal(rows[1].data.values[0].length, 4);
  assert.equal(rows[1].data.values[0][3], "=1+1");
  assert.match(rows[0].url, /Waitlist/);
  assert.match(rows[1].url, /Contact/);
});
