const { User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    if (!users) {
      return res.status(404).json({
        message: "User data is empty!",
      });
    }

    return res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
