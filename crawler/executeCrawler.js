const { eightSecondsSaveAll } = require('./clothes/eightSecondsCrawler');
const { musinsaSaveAll } = require('./clothes/musinsaCrawler');
const { styleShareSaveAll } = require('./clothes/styleShareCrawler');
const { coupangSaveAll } = require('./socialCommerce/coupangCrawler');
const {
  eleventhStreetSaveAll,
} = require('./socialCommerce/eleventhStreetCrawler');
const { gmarketSaveAll } = require('./socialCommerce/gmarketCrawler');
const { tmonSaveAll } = require('./socialCommerce/tmonCrawler');
const { wemakepriceSaveAll } = require('./socialCommerce/wemakepriceCrawler');

const run = async () => {
  /* Clothes */
  await eightSecondsSaveAll();
  await musinsaSaveAll();
  await styleShareSaveAll();

  /* Social Commerce */
  await coupangSaveAll();
  await eleventhStreetSaveAll();
  await gmarketSaveAll();
  await tmonSaveAll();
  await wemakepriceSaveAll();
};

module.exports = {
  run,
};
