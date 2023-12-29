const admin = require('firebase-admin');
const { getFirestore } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithCredential } = require('firebase/auth');
// const config = require('../serverConfig');
// const { getAccessTokenForServer } = require('./firebaseAuth');


// const firebase = require('firebase');

// const firebase = require('firebase/app');

// const { applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBr65BMMRlBRKovD-82QQP-_5hRW0wmrp8",
    authDomain: "work-notifications-edc6e.firebaseapp.com",
    projectId: "work-notifications-edc6e",
    storageBucket: "work-notifications-edc6e.appspot.com",
    messagingSenderId: "383926962106",
    appId: "1:383926962106:web:58ab405779baa422efff83"
}

const config = {
    LOGIN_EMAIL: "balah400@gmail.com",
    LOGIN_PWD: "FiBalaji1!"
}


const serviceAccount = require('../../serviceAccount.json');

admin.initializeApp({
    credentials: admin.credential.cert(serviceAccount)
});

// console.log('config.firebaseConfig ', firebaseConfig);

const app = initializeApp(firebaseConfig);

// console.log('app ', app);

db = getFirestore();
auth = getAuth();

// console.log('auth getAuth() ', auth);


let logged_in_to_db = false;

// console.log('auth ', auth);

signInWithEmailAndPassword(auth, config.LOGIN_EMAIL, config.LOGIN_PWD)
        .then((userCredential) => {
            var user = userCredential.user;
            // console.log('user ', user);

            // let t6 = new Date();
            // console.log('t6 ', t6.getTime());
            logged_in_to_db = true;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Unable to sign in to Firebase Auth ', error);
            console.log('errorCode ', errorCode);
            console.log('errorMessage ', errorMessage);
        });

// getAccessTokenForServer()
//         .then(token => {
//             console.log('token received to login ', token);
//             signInWithCredential(token)
//                 .then((userCredential) => {
//                     var user = userCredential.user;
//                     logged_in_to_db = true;
//                 })
//                 .catch(err => {
//                     console.log('error to login with custom token ', err);
//                 });
//         });

// signInWithPopup(auth, new GoogleAuthProvider())
//     .then((userCredential) => {
//         console.log('userCredential in Google signin ', userCredential, new Date().getTime());
//         var user = userCredential.user;
//         console.log('user ', user);

//         let t6 = new Date();
//         console.log('t6 ', t6.getTime());
//         logged_in_to_db = true;
//     })
//     .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log('errorCode ', errorCode);
//         console.log('errorMessage ', errorMessage);
//         console.log('error ', error);
//     });


// const { getAuth } = require('firebase/auth');
// var db, auth;

// const initFirebase2 = () => {

//     // console.log('firebase 3 ', app);

//     // auth = firebase.auth();
//     // db = firebase.firestore();

//     auth = getAuth();
//     console.log('auth ', auth);
//     db = getFirestore();

//     // db = admin.firestore(admin.apps[0]);


//     console.log('auth.currentUser 2 ', auth.currentUser);

// }

// setTimeout(initFirebase2, 500);












// console.log('admin.auth() ', admin.auth());



// const app = firebase.initializeApp(config.firebaseConfig);

// console.log('config.firebaseConfig ', config.firebaseConfig);
// console.log('process.env ', process.env);


// console.log('firebase in firebase.js ', new Date().getTime(), firebase);

// const firebase = initializeApp({
//     credential: cert(serviceAccount),
//     projectId: "work-notifications-edc6e"
// });

// console.log('firebase ', firebase);



// console.log('after initialization of firebase app ', new Date().getTime(), firebase);
















module.exports = {
    firebase: app,
    db,
    auth
}