const request = require("supertest");
const app = require("../../../app");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRED } = process.env;
const { User } = require("../../../models");

const getUser = async () => {
  return await User.findOne({
    where: { role: "admin" },
    order: [["id", "DESC"]],
  });
};
const user = getUser();
const token = jwt.sign(
  {
    id: user.id || 1,
    email: user.email || "admin@gmail.com",
    role: user.role || "admin",
  },
  JWT_SECRET,
  {
    expiresIn: JWT_EXPIRED,
  }
);

describe("Task User Get", () => {
  describe("GET /api/users/:id", () => {
    it("Should return data users", async () => {
      await request(app)
        .get("/api/users/:1")
        .set("Authorization", token)
        .expect(200);
    });
  });
});
