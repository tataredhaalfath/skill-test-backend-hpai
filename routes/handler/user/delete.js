const { User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: {
        id: userId,
      }
    });
    if (!user) {
      return res.json({
        message: "User not found!",
      });
    }

    await user.destroy();

    return res.json({
      status: "success",
      message: "User data deleted!",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
