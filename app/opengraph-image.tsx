import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Oui Costume Studio: custom dancewear and costumes, handmade in Southern California";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const imagesDir = join(process.cwd(), "public", "images");
  const [logo, photo] = await Promise.all([
    readFile(join(imagesDir, "logo.png"), "base64"),
    readFile(join(imagesDir, "hero-gymnast.jpg"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 680,
            height: "100%",
            borderBottom: "14px solid #69445d",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo}`} width={420} height={317} alt="" />
          <div style={{ display: "flex", width: 64, height: 2, background: "#bd8496", margin: "40px 0 26px" }} />
          <div style={{ display: "flex", fontSize: 26, color: "#30252c", letterSpacing: 1 }}>
            Custom dancewear &amp; costumes
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#70666b", marginTop: 10, letterSpacing: 3 }}>
            HANDMADE IN SOUTHERN CALIFORNIA
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${photo}`}
          width={520}
          height={630}
          alt=""
          style={{ objectFit: "cover", objectPosition: "50% 20%" }}
        />
      </div>
    ),
    size,
  );
}
