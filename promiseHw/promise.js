
// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步
// fs.readFile('test.txt', 'utf8', (err, data) => {
//     if (err) {
//         return console.error('發生錯誤', err);
//     }
//     console.log(data);
// });



const fs = require('fs');

let readFile = (fileName, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) {
                reject('錯誤',err);
            }
            resolve(data);
        });
    })
};

readFile('test.txt', 'utf-8')
.then((data) => {
    console.log("promise版本",data);
}).catch((err) => {
    console.error(err)
});