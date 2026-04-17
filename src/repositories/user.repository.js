const User = require('../models/User');

const updateById = async (userId, data) => {
  return await User.findByIdAndUpdate(userId, { $set: data }, { new: true });
};

const findById = async (userId) => {
  return await User.findById(userId);
};

module.exports = {
  updateById,
  findById,
};
