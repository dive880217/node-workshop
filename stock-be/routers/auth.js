const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
// 可以針對這個 router 使用某些中間件
// router.use(express.json());
// for hash password
const bcrypt = require("bcrypt");

// /api/1.0/auth/register
router.post("/api/1.0/auth/register", async (req, res, next) => {
  // 確認資料有沒有收到
  console.log("register", req.body);
  // TODO: 驗證來自前端的資料

  // 檢查 email 有沒有重複 -> 不能有重複
  // 方法1: 交給 DB: 把 email 欄位設定成 unique
  // 方法2: 我們自己去檢查 -> 去資料撈撈看這個 email 有沒有存在 -> 可能會有 race condition 
  let [members] = await pool.execute("SELECT * FROM members WHERE email = ?", [
    req.body.email,
  ]);
  //輸入的信箱長度
  if (members.length === 0) {
    // 密碼要雜湊 hash
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    // 資料存到資料庫
    let result = await pool.execute(
      "INSERT INTO members (email, password, name) VALUES (?, ?, ?);",
      [req.body.email, hashedPassword, req.body.name]
    );
    console.log("insert new member", result);
    // 回覆前端
    res.json({ message: "ok" });
  } else {
    // 如果有，回覆 400 跟錯誤訊息
    // members 的長度 > 0 -> 有資料 -> 這個 email 註冊過
    return res.status(400).json({ message: "這個 email 已經註冊過" });
  }
});

module.exports = router;
// ```json=
// {"email":"dive880217@gmail.com","name":"Peter","password":"hds56833","confirmPassword":"hds56833"}
// ```
