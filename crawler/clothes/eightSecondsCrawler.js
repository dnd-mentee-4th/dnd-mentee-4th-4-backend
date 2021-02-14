const puppeteer = require('puppeteer');
const { createAll } = require('../../service/promotionService.js');

const BASE_URL =
  'https://www.ssfshop.com/special/list?dspCtgryNo=PLAN&brandShopNo=BDMA07A01&brndShopId=8SBSS&etcCtgryNo=&ctgrySectCd=&keyword=&leftBrandNM=8SECONDS_8SBSS';

const eightSecondsCrawler = (() => {
  const getAll = async (page) => {
    const promotions = await page.evaluate(() => {
      const promotionList = Array.from(document.querySelectorAll('#list > li'));

      return promotionList.map((dom) => {
        const promotion = {};

        promotion.url = dom.querySelector('a').getAttribute('href');

        promotion.image = dom.querySelector('a >img').getAttribute('src');

        promotion.title = dom.querySelector('a > div > span.title').textContent;

        promotion.description = '';

        return JSON.stringify(promotion);
      });
    });

    return Promise.all(promotions);
  };

  const run = async () => {
    let promotions = [];

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(BASE_URL, { waitUnitl: 'networkidle0' });
      await page.waitForSelector('#list > li');

      promotions = await getAll(page);

      await browser.close();
    } catch (e) {
      console.log(e);
    }
    return promotions;
  };

  return { run };
})();

const eightSecondsSaveAll = async () => {
  const promotions = await eightSecondsCrawler.run();

  await createAll(promotions);
};

module.exports = { eightSecondsSaveAll };
