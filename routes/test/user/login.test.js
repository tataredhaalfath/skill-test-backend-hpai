const request = require("supertest");
const app = require("../../../app");

describe("Task User Login", () => {
  describe("POST /api/users", () => {
    it("should return success users login", async () => {
      await request(app)
        .post("/api/login")
        .send({
          email: "tata@gmail.com",
          password: "12345",
        })
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("should return error validate input", async () => {
      const result = {
        status: "error",
        message: [
          {
            type: "required",
            message: "The 'email' field is required.",
            field: "email",
          },
          {
            type: "required",
            message: "The 'password' field is required.",
            field: "password",
          },
        ],
      };
      await request(app)
        .post("/api/login")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400, result);
    });

    it("should return error email not registered", async () => {
      const result = {
        status: "error",
        message: "Email not registered!",
      };

      await request(app)
      .post("/api/login")
      .send({
        "email":"coba@gmail.com",
        "password":"12345"
      })
      .expect("Content-Type",/json/)
      .expect(404,result)
    });

    it("should return error password not correct", async () => {
      const result = {
        status: "error",
        message: "Password not correct!",
      };

      await request(app)
      .post("/api/login")
      .send({
        "email":"tata@gmail.com",
        "password":"12325"
      })
      .expect("Content-Type",/json/)
      .expect(400,result)
    });
  });
});
