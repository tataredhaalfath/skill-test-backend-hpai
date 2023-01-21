const { User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "name", "email", "role"],
    });
    if (!user) {
      return res.json({
        message: "User not found!",
      });
    }

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
