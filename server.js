const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
const app = express();

app.use(bodyParser.json());

const shortid = require("shortid");
const user = require("./api/user");

// //초기 테이블 설정
// db.defaults({
//   user: [],
//   post: [],
//   bookmark: [],
// }).write();

// //초기 테이블에 데이터 입력
// db.get("user")
//   .push({
//     userNo: shortid.generate(),
//     id: "test2",
//     pwd: "test2",
//     name: "test2",
//   })
//   .write();

// db.get("post")
//   .push({
//     eNo: shortid.generate(),
//     cat: "free",
//     eName: "test",
//     sDate: "2023-01-01",
//     eDate: "2023-12-31",
//     thumbNail: "",
//     info: "test",
//     img: "",
//   })
//   .write();

//북마크의 경우 새로 생겼을때 object join을 통하여 데이터 생성
// db.get("bookmark")
//   .push({
//     bNo: shortid.generate(),
//     bid: user.id,
//     bName: exhibition.eName,
//   })
//   .write();

//login api
app.post("/login", user.login);

//logout api
app.post("/logout", user.logout);

// app.get("/protected", verifyJWT, (req, res) => {
//   const id = req.id;
// });
// app.post("/login", async (req, res) => {
//   console.log("body", req.body);
//   const id = req.body.id;
//   const pwd = req.body.pwd;

//포트 4000번으로 고정, 백엔드 실행시 콘솔창에서 user와 exhibition테이블의 데이터를 볼수 있음
app.listen(4000, () => {
  console.log("Server is running");
});
