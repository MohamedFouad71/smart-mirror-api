const User = require("../models/User");

async function me(req, res) {
  const user = await User.findById(req.user.userId).select("-passwordHash");
  if (!user) return res.status(404).json({ ok: false, error: "user not found" });
  res.json({ ok: true, user });
}

module.exports = { me };
