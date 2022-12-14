const md5 = require('md5')
console.log('md5',md5('erererere'));
console.log("md5", md5("wwwwwwwww"));
console.log("md5", md5("wwwwwwwww"));
console.log("md5", md5("wwwweerwwww"));


//盡量不要再用md5去做密碼加密 ， 容易破解 用argon2 or bcrypt
// login: email, password
// select * from members where email = email and password = md5(password)
// 彩虹表

// bcrypt
console.log("--------------------------------------");
const bcrypt = require('bcrypt');
(async () => {
  let result1 = await bcrypt.hash('test12345', 10);
  console.log('bcrypt: ', result1); // len 60
  let result2 = await bcrypt.hash('test12345', 10);
  console.log('bcrypt: ', result2);

  let result3 = await bcrypt.hash('test123457890987736423', 10);
  console.log('bcrypt: ', result3);
})();

// argon2
const argon2 = require('argon2');
(async () => {
  let result1 = await argon2.hash('test12345', 10);
  console.log('argon2: ', result1); // len 96
  let result2 = await argon2.hash('test12345', 10);
  console.log('argon2: ', result2);

  let result3 = await argon2.hash('test123457890987736423', 10);
  console.log('argon2: ', result3);
})();