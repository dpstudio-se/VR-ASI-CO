import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const html = "file:///workspace/.grok/og-card/index.html";
const out = "/workspace/.grok/og-card/card-raw.png";

const browser = await chromium.launch({
  args: ["--disable-web-security", "--allow-file-access-from-files"],
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.goto(html, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(200);
await page.screenshot({ path: out, type: "png", omitBackground: false });
await browser.close();
writeFileSync("/workspace/.grok/og-pending", "");
console.log("wrote", out);
