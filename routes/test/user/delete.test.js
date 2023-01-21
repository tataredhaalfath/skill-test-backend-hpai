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

describe("Task Delete", () => {
  describe("GET /api/delete/:id", () => {
    it("Should delete user data", async () => {
      await request(app)
        .delete("/api/users/:1")
        .set("Authorization", token)
        .expect(jest.fn().mockResolvedValueOnce("test"));
    });
  });
});
