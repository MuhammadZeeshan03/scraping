const puppeteer = require("puppeteer");
import { Browser } from "puppeteer";
const fs = require("fs");

const url = "";

const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const properties = await page.evaluate((url) => {
    const card = Array.from(document.querySelectorAll(".placard-pseudo"));

    const data = card.map((property: any) => ({
      title: property.querySelector("a").getAttribute("title")
      // price: property.querySelector(".Price").innerText || ""
    }));

    return data;
  }, url);

  console.log(properties);

  await browser.close();
  fs.writeFile("data.json", JSON.stringify(properties), (err: any) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

for (let i = 0; i < 5; i++) {
  main();
}
