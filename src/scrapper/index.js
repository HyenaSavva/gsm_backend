const { arrayFromLength } = require("../utils/helpers");
const { getPageContent } = require("./getPageContent");
const cheerio = require("cheerio");

const executeScrapper = async () => {
  try {
    const items = [];
    const pages = arrayFromLength(5).reverse();
    const url = `https://www.spy-shop.ro/supraveghere-video/camere-supraveghere.html?limit=80&mode=grid`;

    for (const page of pages) {
      const pageContent = await getPageContent(
        page !== 1 ? url + `&p=${page}` : url
      );

      const $ = cheerio.load(pageContent);
      $(".wrapper-hover").each((i, el) => {
        const item = $(el).find(".product-image");
        const specialPrice = $(el).find(".special-price");

        const title = item.attr("title");
        const href = item.attr("href");
        const image = item.children("img").attr("data-src");
        let price = "";

        if (specialPrice.length) {
          price = $(el).find(".special-price [content]").attr("content");
        } else {
          price = $(el).find(".regular-price [content]").attr("content");
        }
        console.log({ title, href, image, price });
        items.push({ title, href, image, price });
      });
    }
    return items;
  } catch (err) {
    return err;
  }
};

module.exports = { executeScrapper };
