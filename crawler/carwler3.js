
const axios = require("axios");
const moment = require("moment");
let  fs = require("fs");

const readFile = (file, stock) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, stock, (err, data) => {
      if (err) return reject(`Error!! "${err}"`);
      resolve(`${data}`);
    });
  });
};


//取得日期
let queryDate = moment().format('YYYYMMDD'); //'20220814' or YYYY/(-)MM/(-)DD ;

(async () => {
  try {
    let stockNo = await readFile("stock.txt", "utf8");
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNo,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})();

 //node carwler3.js
