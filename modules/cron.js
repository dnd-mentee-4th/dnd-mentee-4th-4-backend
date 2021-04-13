const cron = require('node-cron');
const {
  eightSecondsSaveAll,
} = require('../crawler/clothes/eightSecondsCrawler');
const { musinsaSaveAll } = require('../crawler/clothes/musinsaCrawler');
const { styleShareSaveAll } = require('../crawler/clothes/styleShareCrawler');
const { coupangSaveAll } = require('../crawler/socialCommerce/coupangCrawler');
const {
  eleventhStreetSaveAll,
} = require('../crawler/socialCommerce/eleventhStreetCrawler');
const { gmarketSaveAll } = require('../crawler/socialCommerce/gmarketCrawler');
const { tmonSaveAll } = require('../crawler/socialCommerce/tmonCrawler');
const {
  wemakepriceSaveAll,
} = require('../crawler/socialCommerce/wemakepriceCrawler');
// const executeCrawler = require('../crawler/executeCrawler');

const batch = () => {
  /**
   * 매일 04:00에 Crawling 작업을 실시한다.
   * {1, 2, 3}, {4, 5}, {6, 7, 8} : 5분 간격으로 크롤링을 실시한다.
   */

  const START_HOUR = 4; // 0 ~ 23
  const START_MINUTE = 0; // 0 ~ 59
  const INTERVAL = 5; // crawling interval (minutes)

  cron.schedule(
    `${START_MINUTE + INTERVAL * 0} ${START_HOUR} * * *`,
    async () => {
      await musinsaSaveAll();
      await styleShareSaveAll();
      await eightSecondsSaveAll();
    },
  );
  cron.schedule(
    `${START_MINUTE + INTERVAL * 1} ${START_HOUR} * * *`,
    async () => {
      await coupangSaveAll();
      await eleventhStreetSaveAll();
    },
  );
  cron.schedule(
    `${START_MINUTE + INTERVAL * 2} ${START_HOUR} * * *`,
    async () => {
      await gmarketSaveAll();
      await tmonSaveAll();
      await wemakepriceSaveAll();
    },
  );
};

module.exports = {
  batch,
};
