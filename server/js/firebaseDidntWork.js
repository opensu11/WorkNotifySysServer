const admin = require('firebase-admin');
const config = require('../serverConfig');

const { initializeApp } = require('firebase/app');

const serviceAccount = require('../../serviceAccount.json');


admin.initializeApp({
    credentials: admin.credential.cert(serviceAccount)
})

db = admin.firestore();

module.exports = {
    db
}