const express = require('express');
const searchService = require('../service/searchService');

const router = express.Router();

router.get('/search', async (req, res) => {
  const searchWord = req.query.name;

  // 브랜드 검색 기능이 필요할 때 활성화 예정
  // const resultByBrand = await searchService.searchByBrand(searchWord);
  const resultByTitle = await searchService.searchByTitle(searchWord);
  const resultByDescription = await searchService.searchByDescription(
    searchWord,
  );

  const rawResult = [...resultByTitle, ...resultByDescription];

  const result = [];
  const idSet = new Set(); // 중복된 검색 결과를 제거하기 위함

  for (const elem of rawResult) {
    const currId = elem.id;
    if (!idSet.has(currId)) {
      result.push(elem);
      idSet.add(currId);
    }
  }

  res.status(200).send(result);
});

module.exports = router;
