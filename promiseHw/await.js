const fs = require('fs');

function doRead(fileName, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, options, (err, data) => {
            if (err) {
                return reject('發生錯誤', err);
            }
            resolve(data);
        });
    })
}

async function result() {
    try {
        let content = await doRead('test.txt', 'utf8');
        console.log('test.txt', content);

    
    } catch (err) {
        console.log(err);
    }
}
result();

let i =1
console.log("w1") 
setTimeout(()=>{
    i=100
    console.log("w3",i)
},110)
console.log("w2",i)