const puppeteer = require('puppeteer');
const { createAll, destroyAll } = require('../../service/promotionService.js');
const { findByName } = require('../../service/brandService.js');

const httpsPrefix = 'https:';
const URL = `${httpsPrefix}//front.wemakeprice.com/promotions/main`;

const appendHttps = (url) => {
  if (url.indexOf(httpsPrefix) === -1) {
    // 접두사 'https:' 가 없는 URL일 경우
    return httpsPrefix + url;
  }
  return url; // 정상적인 URL일 경우
};

const getTitle = (raw) => {
  // RAW Data에서 필요한 값만 추출
  return raw.substr(raw.indexOf('_') + 1);
};

const wemakepriceCrawler = (() => {
  const getAll = async (page) => {
    // 프로모션 페이지가 로딩될 때까지 대기
    await page.waitForSelector('#_contents > div > div.promotion_list > ul');

    const promotionList = await page.$$(
      '#_contents > div > div.promotion_list > ul > li',
    );

    const scrappedData = [];
    for (const promotion of promotionList) {
      scrappedData.push(
        JSON.stringify({
          url: appendHttps(
            await promotion.$eval('a[href]', (card) =>
              card.getAttribute('href'),
            ),
          ),
          image: await promotion.$eval('img[src]', (img) =>
            img.getAttribute('src'),
          ),
          title: getTitle(
            await promotion.$eval('a[data-gtm-label]', (card) =>
              card.getAttribute('data-gtm-label'),
            ),
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

const wemakepriceCrawlerSaveAll = async () => {
  const brand = await findByName('위메프');
  const promotions = await wemakepriceCrawler.run();

  await destroyAll(brand.dataValues.id);
  await createAll(promotions, brand);
};

module.exports = { wemakepriceCrawlerSaveAll };
