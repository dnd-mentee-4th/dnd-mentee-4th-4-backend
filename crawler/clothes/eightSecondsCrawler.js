const puppeteer = require('puppeteer');
const { createAll, destroyAll } = require('../../service/promotionService.js');
const { findByName } = require('../../service/brandService.js');

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

  const run = async (url) => {
    let promotions = [];

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUnitl: 'networkidle0' });
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
  const brand = await findByName('에잇세컨즈');
  const promotions = await eightSecondsCrawler.run(brand.promotionUrl);

  await destroyAll(brand.dataValues.id);
  await createAll(promotions, brand);
};

module.exports = { eightSecondsSaveAll };
