const puppeteer = require('puppeteer');
const { createAll, destroyAll } = require('../../service/promotionService.js');
const { findByName } = require('../../service/brandService.js');

const URL = 'https://www.gmarket.co.kr/';

const gmarketCrawler = (() => {
  const getAll = async (page) => {
    // 기획전 페이지 보기('+' 버튼 클릭)
    await page.$eval('button.button__more', (btn) => btn.click());

    // 기획전 목록 가져오기
    const promotionList = await page.$$(
      'div.section__all-promotion > div > ul > li',
    );

    const scrappedData = [];

    // 각 기획전 element에서 필요한 데이터 추출
    for (const promotion of promotionList) {
      scrappedData.push(
        JSON.stringify({
          url: await promotion.$eval('a', (elem) => elem.getAttribute('href')),
          image: await promotion.$eval('a > div > img', (elem) =>
            elem.getAttribute('src'),
          ),
          title: await promotion.$eval('a > div > img', (elem) =>
            elem.getAttribute('alt'),
          ),
          description: '',
        }),
      );
    }
    return Promise.all(scrappedData);
  };

  const run = async () => {
    let promotions;

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(URL);

      promotions = await getAll(page);

      await browser.close();
    } catch (e) {
      console.error(e);
    }

    return promotions;
  };

  return { run };
})();

const gmarketSaveAll = async () => {
  const brand = await findByName('G마켓');
  const promotions = await gmarketCrawler.run();

  await destroyAll(brand.dataValues.id);
  await createAll(promotions, brand);
};

module.exports = { gmarketSaveAll };
