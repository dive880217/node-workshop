const fs = require('fs/promises');

console.log('second', __dirname);

// /Users/azole/Sites/MFEE27/nodejs-workshop/dirname/sub/../stock.txt
fs.readFile(__dirname + '/../stock.txt', 'utf-8')
  .then((result) => {
    console.log('second', result);
  })
  .catch((e) => {
    console.error('second', e);
  });
