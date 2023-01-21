const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Authorization not found!");
    }
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decode.id,
      },
    });
    if (!user) {
      throw new Error("Invalid!");
    }

    req.user = decode;
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
