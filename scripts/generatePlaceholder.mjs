import { chromium } from "playwright";

const [,, outputPath, widthArg = "1200", heightArg = "800", bg = "#0b0f14", fg = "#f8f8f9", text = "DEZITECH"] = process.argv;

if (!outputPath) {
  console.error("Usage: node scripts/generatePlaceholder.mjs <outputPath> [width] [height] [background] [foreground] [text]");
  process.exit(1);
}

const width = Number(widthArg);
const height = Number(heightArg);

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at 20% 20%, rgba(248, 248, 249, 0.12), transparent 55%), ${bg};
        font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
      }
      h1 {
        color: ${fg};
        letter-spacing: 0.65rem;
        font-size: 3rem;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <h1>${text}</h1>
  </body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: outputPath, type: outputPath.endsWith(".png") ? "png" : "jpeg" });
  await browser.close();
})();
