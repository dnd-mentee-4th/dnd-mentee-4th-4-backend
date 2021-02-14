const puppeteer = require('puppeteer');
const { createAll } = require('../../service/promotionService.js');

const categories = [
  { index: '01', type: '브랜드패션 기획전' },
  { index: '02', type: '의류 기획전' },
  { index: '03', type: '잡화 기획전' },
  { index: '04', type: '뷰티 기획전' },
  { index: '05', type: '식품 기획전' },
  { index: '06', type: '유아동 기획전' },
  { index: '07', type: '가구 기획전' },
  { index: '08', type: '생활용품 기획전' },
  { index: '09', type: '레저/자동차 기획전' },
  { index: '10', type: '디지털/가전 기획전' },
  { index: '11', type: '도서/여행/취미 기획전' },
  { index: '12', type: '해외직구 기획전' },
  { index: '13', type: '홈&카서비스 기획전' },
];

const getUrl = (index, page) => {
  return `https://www.11st.co.kr/plan/front/displays/${index}?pageNo=${page}`;
};

// 문자열에서 숫자를 추출하는 함수
const getNumber = (method) => {
  let num = '';
  for (const ch of method) {
    if (!isNaN(ch)) {
      num += ch;
    }
  }
  return Number(num);
};

const getCompleteUrl = (url) => {
  return `http://www.11st.co.kr/${url}`;
};

const eleventhStreetCrawler = (() => {
  const getAll = async (page) => {
    const scrappedData = [];

    // 카테고리 별 페이지 모두 탐색
    for (const currCategory of categories) {
      let currPageNum = 1;
      const startUrl = getUrl(currCategory.index, currPageNum);
      await page.goto(startUrl);

      let lastPageNum; // 현재 카테고리가 여러 페이지로 구성되어 있을 경우 마지막 페이지 번호를 저장.
      try {
        // 여러 페이지일 경우
        lastPageNum = getNumber(
          await page.$eval(
            '#layBody > div.product_list_box_v2 > div.s_paging > a.last',
            (elem) => elem.getAttribute('onclick'),
          ),
        );
      } catch (err) {
        // 단일 페이지일 경우
        lastPageNum = 1;
      }

      // 현재 카테고리의 모든 페이지를 순회하면서 데이터 수집
      for (currPageNum = 1; currPageNum <= lastPageNum; currPageNum++) {
        const URL = getUrl(currCategory.index, currPageNum);
        await page.goto(URL);

        const planList = await page.$$(
          '#layBody > div.product_list_box_v2 > div.inner_box > ul.list_box > li',
        );

        for (const plan of planList) {
          scrappedData.push(
            JSON.stringify({
              url: getCompleteUrl(
                await plan.$eval('div.banner_box > h3 > a', (elem) =>
                  elem.getAttribute('href'),
                ),
              ),
              image: await plan.$eval('div.banner_box > h3 > a > img', (elem) =>
                elem.getAttribute('src'),
              ),
              title: await plan.$eval('div.banner_box > h3 > a > img', (elem) =>
                elem.getAttribute('alt'),
              ),
              description: currCategory.type,
            }),
          );
        }
      }
    }
    return Promise.all(scrappedData);
  };

  const run = async () => {
    let promotions;

    try {
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();

      promotions = await getAll(page);

      await browser.close();
    } catch (e) {
      console.error(e);
    }

    return promotions;
  };

  return { run };
})();

const eleventhStreetCrawlerSaveAll = async () => {
  const promotions = await eleventhStreetCrawler.run();

  await createAll(promotions, 5);
};

module.exports = { eleventhStreetCrawlerSaveAll };
