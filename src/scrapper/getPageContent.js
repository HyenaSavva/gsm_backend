const puppeteer = require("puppeteer");

const PAGE_OPTIONS = {
  networkIdle2Timeout: 7000,
  waitUntil: "networkidle2",
  timeout: 14000,
};

const getPageContent = async (goTo, searchQuery) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(goTo, PAGE_OPTIONS);
    const content = await page.content();

    await browser.close();
    return content;
  } catch (err) {
    return err;
  }
};

module.exports = { getPageContent };
