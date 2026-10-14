import { JWT } from "google-auth-library";

type SheetConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  range: string;
};

type WaitlistEntry = {
  name: string;
  email: string;
  projectType: string;
  projectFormat: string;
  priceRange: string;
  message: string;
};

function getSheetConfig(range: string | undefined): SheetConfig | null {
  const clientEmail = process.env.SHEETS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_WAITLIST_SPREADSHEET_ID?.trim();

  if (!clientEmail || !privateKey || !spreadsheetId || !range) return null;
  return { clientEmail, privateKey, spreadsheetId, range };
}

export function getWaitlistSheetConfig(): SheetConfig | null {
  return getSheetConfig(process.env.GOOGLE_WAITLIST_RANGE?.trim());
}

export function getContactSheetConfig(): SheetConfig | null {
  return getSheetConfig(process.env.GOOGLE_CONTACT_RANGE?.trim() ?? "'Contact'!A:D");
}

export async function appendWaitlistEntry(config: SheetConfig, entry: WaitlistEntry) {
  await appendSheetRow(config, [
    new Date().toISOString(), entry.name, entry.email, entry.projectType,
    entry.projectFormat, entry.priceRange, entry.message,
  ]);
}

export async function appendContactEntry(
  config: SheetConfig,
  entry: Pick<WaitlistEntry, "name" | "email" | "message">,
) {
  await appendSheetRow(config, [new Date().toISOString(), entry.name, entry.email, entry.message]);
}

async function appendSheetRow(config: SheetConfig, values: string[]) {
  const auth = new JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.spreadsheetId)}/values/${encodeURIComponent(config.range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const response = await auth.request<{ updates?: { updatedRows?: number } }>({
    url,
    method: "POST",
    timeout: 10_000,
    retry: false,
    data: {
      values: [values],
    },
  });
  if (response.data.updates?.updatedRows !== 1) {
    throw new Error("Google Sheets did not confirm saving the submission.");
  }
}
