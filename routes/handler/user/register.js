const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      name: "string|empty:false",
      email: "email|empty:false",
      password: "string|empty:false|min:5",
      role: { type: "enum", values: ["admin", "user"], optional:true },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const { name, email, password, role } = req.body;

    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      return res.status(409).json({
        status: "error",
        message: "Email already registered!",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      password: passwordHash,
      role,
    };

    const newUser = await User.create(data);
    return res.status(201).json({
      status: "success",
      message: "Registration Success",
      data: {
        id: newUser.id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      satus: "error",
      message: error.message,
    });
  }
};
