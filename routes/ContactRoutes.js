const express = require("express");
const SendContactEmail = require("../controllers/ContactController");

const router = express.Router();

router.post('/contactus', SendContactEmail); 

module.exports = router; 

