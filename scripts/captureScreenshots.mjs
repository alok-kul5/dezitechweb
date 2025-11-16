import { chromium } from "playwright";

const BASE_URL = process.env.SITE_URL ?? "http://localhost:3200";

async function captureScreens() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const heroSection = page.locator("main > section").first();
  await heroSection.scrollIntoViewIfNeeded();
  await heroSection.screenshot({ path: "artifacts/hero.png" });

  const kpiSection = page.locator("section:has-text('Live delivery metrics')").first();
  await kpiSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await kpiSection.screenshot({ path: "artifacts/kpi-row.png" });

  await browser.close();
}

captureScreens().catch((error) => {
  console.error("Screenshot capture failed", error);
  process.exit(1);
});
