const puppeteer = require('puppeteer');
const { createAll } = require('../../service/promotionService.js');
const { findByName } = require('../../service/brandService.js');

async function getOne(page, index, url) {
  const promotion = {};
  promotion.url =
    url +
    (await page.$eval(
      `body > div.wrap > div.right_area > div.right_contents > ul > li:nth-child(${index}) > a`,
      (data) => data.getAttribute('href'),
    ));

  promotion.image = await page.$eval(
    `body > div.wrap > div.right_area > div.right_contents > ul > li:nth-child(${index}) > a > div > img`,
    (data) => {
      const image =
        data.getAttribute('data-original') === null
          ? data.getAttribute('src')
          : data.getAttribute('data-original');

      return `https:${image}`;
    },
  );

  promotion.title = await page.$eval(
    `body > div.wrap > div.right_area > div.right_contents > ul > li:nth-child(${index}) > a > strong`,
    (data) => data.innerText,
  );

  promotion.description = await page.$eval(
    `body > div.wrap > div.right_area > div.right_contents > ul > li:nth-child(${index}) > a > p`,
    (data) => data.innerText,
  );

  promotion.startAt = await page.$eval(
    `body > div.wrap > div.right_area > div.right_contents > ul > li:nth-child(${index}) > a > span`,
    (data) => data.innerText.split(' - ')[0],
  );

  promotion.endAt = await page.$eval(
    `body > div.wrap > div.right_area > div.right_contents > ul > li:nth-child(${index}) > a > span`,
    (data) => data.innerText.split(' - ')[1],
  );
  return JSON.stringify(promotion);
}

async function getAll(page, url) {
  const promotions = [];

  const $promotions = await page.$$eval(
    'body > div.wrap > div.right_area > div.right_contents > ul > li',
    (date) => date.length,
  );

  for (let index = 0; index < $promotions; index++) {
    const promotion = getOne(page, index + url);

    promotions.push(promotion);
  }

  return Promise.all(promotions);
}

const musinsaCrawler = async (url) => {
  let promotions = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url}/app/plan/lists`);

    promotions = await getAll(page, url);

    await browser.close();
  } catch (e) {
    console.log(e);
  }

  return promotions;
};

const musinsaSaveAll = async () => {
  const brand = await findByName('무신사');

  const promotions = await musinsaCrawler(brand.promotionUrl);

  await createAll(promotions, brand);
};

module.exports = { musinsaSaveAll };
