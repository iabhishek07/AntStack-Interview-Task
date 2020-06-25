const express = require("express");
const bodyParser = require("body-parser");
const firebaseConnection = require("./../dbconfig");

const router = express.Router();

router.route("/").get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const snapShot = await firebaseConnection.firestore().collection('chats').get();
    res.json( snapShot.docs.map(doc => doc.data()) );
});

module.exports = router;