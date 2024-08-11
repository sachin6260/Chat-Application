const { addMessage, getMessages } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages); // Make sure this matches the route you're calling

module.exports = router;
