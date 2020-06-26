const express = require("express");
const bodyParser = require("body-parser");
const firebaseConnection = require("./../dbconfig");
const encryptDecrypt = require('../encryptDecrypt');
const router = express.Router();

router.route("/chats/:secretKey").get(async (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    console.log(req.params.secretKey);
    const snapShot = await firebaseConnection.firestore().collection('chats').get();
    let messagesData = snapShot.docs.map(doc => doc.data());
    // console.log(JSON.stringify(messagesData));
    messagesData.forEach((element)=>{
        const decipherMsg = encryptDecrypt.decipher(req.params.secretKey);
        element['message'] = decipherMsg(element['message']);
        // console.log(JSON.stringify(element));
    })
    res.json( messagesData );
});

module.exports = router;