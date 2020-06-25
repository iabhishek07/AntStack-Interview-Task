var firebase = require('firebase');
var firebaseConnection = firebase.initializeApp({
    apiKey: "AIzaSyCwN49sUhKa-QWStSpADBFBIHbRuAxq_bM",
    authDomain: "antstack-one-to-one-chat.firebaseapp.com",
    databaseURL: "https://antstack-one-to-one-chat.firebaseio.com",
    projectId: "antstack-one-to-one-chat",
    storageBucket: "antstack-one-to-one-chat.appspot.com",
    messagingSenderId: "905601229059",
    appId: "1:905601229059:web:e15fd92812aa863b51c936",
    measurementId: "G-Z0L90TF63W"
});


module.exports = firebaseConnection;