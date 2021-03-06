const puppeteer = require('puppeteer');
const { createAll, destroyAll } = require('../../service/promotionService.js');
const { findByName } = require('../../service/brandService.js');

const BASE_URL = 'https://www.styleshare.kr';

const styleShareCrawler = (() => {
  const getAll = async (page) => {
    const promotions = await page.evaluate(() => {
      const promotionList = Array.from(
        document.querySelectorAll(
          '#app > main > div > div.BannerContainer__StyledContainer-jygeOL.cWPmxb.store__banner > div.slick-slider.slick-initialized > div > div > div',
        ),
      );

      return promotionList.map((dom) => {
        const promotion = {};

        promotion.url = dom.querySelector('div > div > a').getAttribute('href');

        promotion.image = dom
          .querySelector('div > div > a > picture > img')
          .getAttribute('src');

        promotion.title =
          dom.querySelector(
            'div > div > a > div > div.BannerDescription__StyledDescription-fnsujr',
          ) === null
            ? ''
            : dom.querySelector(
                'div > div > a > div > div.BannerDescription__StyledDescription-fnsujr',
              ).textContent;

        promotion.description =
          dom.querySelector(
            'div > div > a > div > div.BannerDescription__StyledSubDescription-ebdyxv',
          ) === null
            ? ''
            : dom.querySelector(
                'div > div > a > div > div.BannerDescription__StyledSubDescription-ebdyxv',
              ).textContent;

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
      await page.goto(`${BASE_URL}/store`, { waitUnitl: 'networkidle0' });
      await page.waitForSelector(
        '#app > main > div > div.BannerContainer__StyledContainer-jygeOL.cWPmxb.store__banner > div.slick-slider.slick-initialized > div > div > div',
      );

      promotions = await getAll(page);

      await browser.close();
    } catch (e) {
      console.log(e);
    }

    return promotions;
  };

  return { run };
})();

const styleShareSaveAll = async () => {
  const brand = await findByName('스타일쉐어');
  const promotions = await styleShareCrawler.run();

  await destroyAll(brand.dataValues.id);
  await createAll(promotions, brand);
};

module.exports = { styleShareSaveAll };
