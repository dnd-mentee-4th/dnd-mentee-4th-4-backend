const cron = require('node-cron');
const executeCrawler = require('../crawler/executeCrawler');

const batch = () => {
  // 매일 04:00에 Crawling 작업을 실시한다.
  cron.schedule('0 4 * * *', async () => {
    await executeCrawler.run();
  });
};

module.exports = {
  batch,
};
