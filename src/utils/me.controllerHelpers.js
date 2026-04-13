const User = require('../models/User');

exports.fetchUserOr404 = async (userId, selectFields, res) => {
  const user = await User.findById(userId).select(selectFields);
  if (!user) {
    res.status(404).json({ ok: false, error: 'user not found' });
    return null;
  }
  return user;
};
