const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const shortid = require("shortid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.use((req, res, next) => {
  res.status = 404;
  next(Error("not found"));
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(res.statusCode || 500);
  res.json({ error: err.message || "internal server error" });
});

//초기 테이블 설정
db.defaults({
  user: [],
  exhibition: [],
  bookmark: [],
}).write();

//초기 테이블에 데이터 입력
db.get("user")
  .push({
    userNo: shortid.generate(),
    id: "test",
    pwd: "test",
    name: "test",
  })
  .write();

db.get("exhibition")
  .push({
    eNo: shortid.generate(),
    cat: "free",
    eName: "test",
    sDate: "2023-01-01",
    eDate: "2023-12-31",
    thumbNail: "",
    info: "test",
    img: "",
  })
  .write();

//북마크의 경우 새로 생겼을때 object join을 통하여 데이터 생성
// db.get("bookmark")
//   .push({
//     bNo: shortid.generate(),
//     bid: user.id,
//     bName: exhibition.eName,
//   })
//   .write();

//포트 4000번으로 고정, 백엔드 실행시 콘솔창에서 user와 exhibition테이블의 데이터를 볼수 있음
server.listen(4000, () => {
  console.log("JSON Server is running");
  console.log(db.get("user").value());
  console.log(db.get("exhibition").value());
});

module.exports = server;
