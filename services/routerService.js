import puppeteer from "puppeteer";
import { env } from "../config/env.js";

export async function fetchConnectedDevices() {
  const browser = await puppeteer.launch({
    headless: env.headless,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  try {

    await page.goto(env.routerUrl, { waitUntil: "networkidle2" });

    await page.type("input[name=username]", env.username);
    await page.type("input[name=password]", env.password);

    await Promise.all([
      page.click("button[type=submit]"),
      page.waitForNavigation({ waitUntil: "networkidle2" })
    ]);

    await page.goto(env.routerUrl + env.devicePage, {
      waitUntil: "networkidle2"
    });

    const devices = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tr");

      const results = [];

      rows.forEach(row => {
        const cols = row.querySelectorAll("td");

        if (cols.length >= 2) {
          results.push({
            name: cols[0].innerText.trim(),
            mac: cols[1].innerText.trim()
          });
        }
      });

      return results;
    });

    return devices;

  } finally {
    await browser.close();
  }
}
