const request = require("supertest");
const app = require("../../../app");

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Task User Register", () => {
  describe("POST /api/users", () => {
    it("Should return success", async () => {
      const data = {
        name: `jojo ${makeid(2)}`,
        email: `jojo${makeid(2)}@gmail.com`,
        password: "12345",
      };

      await request(app)
        .post("/api/users")
        .send(data)
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("Should return error validate input", async () => {
      const result = {
        status: "error",
        message: [
          {
            type: "required",
            message: "The 'name' field is required.",
            field: "name",
          },
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
        .post("/api/users")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400, result);
    });

    it("Should return error validate input", async () => {
      const data = {
        name: `tata`,
        email: `tata@gmail.com`,
        password: "12345",
      };
      const result = {
        status: "error",
        message: "Email already registered!",
      };
      await request(app)
        .post("/api/users")
        .send(data)
        .expect("Content-Type", /json/)
        .expect(409, result);
    });
  });
});
