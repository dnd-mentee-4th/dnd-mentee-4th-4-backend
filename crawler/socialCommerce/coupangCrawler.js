const puppeteer = require('puppeteer');
const { createAll, destroyAll } = require('../../service/promotionService.js');
const { findByName } = require('../../service/brandService.js');

const URL = 'https://www.coupang.com/np/exhibition/ALL';

const httpsPrefix = 'https:';
const coupangSourceUrl = `${httpsPrefix}//www.coupang.com`;

const getCompleteUrl = (url, type) => {
  if (url.indexOf(httpsPrefix) === -1) {
    if (type === 1) {
      // type === 1 : 'PROMOTION'
      return coupangSourceUrl + url;
    }
    // type === 2 : 'IMAGE'
    return httpsPrefix + url;
  }
  return url;
};

const coupangCrawler = (() => {
  const getAll = async (page) => {
    // 기획전 목록 가져오기
    const promotionList = await page.$$('ul#productList > li');

    // 기획전 데이터 element를 JSON 형태로 가공
    const scrappedData = [];
    for (const promotion of promotionList) {
      scrappedData.push(
        JSON.stringify({
          url: getCompleteUrl(
            await promotion.$eval('a', (elem) => elem.getAttribute('href')),
            1,
          ),
          image: getCompleteUrl(
            await promotion.$eval('a > img', (elem) =>
              elem.getAttribute('src'),
            ),
            2,
          ),
          title: 'untitled',
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

const coupangCrawlerSaveAll = async () => {
  const brand = await findByName('쿠팡');
  const promotions = await coupangCrawler.run();

  await destroyAll(brand.dataValues.id);
  await createAll(promotions, brand);
};

module.exports = { coupangCrawlerSaveAll };
