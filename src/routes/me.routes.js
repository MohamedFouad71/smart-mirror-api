const router = require("express").Router();
const auth = require("../middleware/auth");
const { me } = require("../controllers/me.controller");

router.get("/", auth, me);

module.exports = router;
