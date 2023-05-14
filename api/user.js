const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

const authService = require("../auth");

const login = async (req, res) => {
  console.log("body", req.body);

  const { id, pwd } = req.body;

  const loginUser = db.get("user").find({ id, pwd }).value();

  if (!loginUser) {
    return res.json({
      loginSuccess: false,
      error: "아이디와 비밀번호를 확인해주세요.",
    });
  }

  const accessToken = authService.signToken(loginUser.id);
  res.json({ accessToken, loginUser, loginSuccess: true });
};

const logout = (req, res) => {
  // Remove JWT token from client-side storage
  res.send({ success: true });
};

module.exports = {
  login,
  logout,
};
