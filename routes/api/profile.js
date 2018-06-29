const express = require("express");
const router = express.Router();

//@route   GET api/profiletest
//@desc    Test profile route
//@acess   Public
router.get("/test", (req, res) => res.json({ msg: "Profile works!" }));

module.exports = router;
