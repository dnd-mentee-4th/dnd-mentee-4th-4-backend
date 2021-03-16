const puppeteer = require('puppeteer');
const { createAll } = require('../../service/promotionService.js');
const { findByName } = require('../../service/brandService.js');

const URL = 'http://www.tmon.co.kr/planning/';

// 스크롤에 반응하는 사이트에서 추가적인 데이터를 얻기 위해 autoScroll 메서드 생성
const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 500; // 스크롤 1회당 간격
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100); // 스크롤 1회당 시간 간격
    });
  });
};

const tmonCrawler = (() => {
  const getAll = async (page) => {
    // 스크롤 가장 아래로 내려서 모든 데이터 로딩
    await autoScroll(page);

    const planList = await page.$$(
      '#planWrap > div > div > div.plan_collect_box',
    );

    const scrappedData = [];
    for (const plan of planList) {
      scrappedData.push(
        JSON.stringify({
          url: await plan.$eval('div.plan_collect_banner > a', (elem) =>
            elem.getAttribute('href'),
          ),
          image: await plan.$eval('div.plan_collect_banner > a > img', (elem) =>
            elem.getAttribute('src'),
          ),
          title: await plan.$eval('div.plan_collect_banner > a > img', (elem) =>
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

const tmonCrawlerSaveAll = async () => {
  const brand = await findByName('티몬');
  const promotions = await tmonCrawler.run();

  await createAll(promotions, brand);
};

module.exports = { tmonCrawlerSaveAll };
