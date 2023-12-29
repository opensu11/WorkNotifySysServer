// const firebase = require('firebase-admin');

// const serviceAccount = require('../../firebase.config.json');

// firebase.initializeApp({
//     credential: firebase.credential.cert(serviceAccount)
// });

// module.exports = { firebase }

const express = require('express');
const { google } = require('google-auth-library');

const allRoute = require('./routes/allRoutes');
const NotificationManager = require('./notification_manager.js');

const { getAccessTokenForServer } = require('./firebaseAuth');

const app = express();
app.use(express.json());  // for reading incoming json

app.use('/notification', allRoute);

const port = 3000;

const notificationManager = new NotificationManager();

// implement code for generating server key - token and return back
// ***** remove comments for generating server key token
// ***** disabled now to check the new route way of doing design
app.get('/generate-server-token', (req, res) => {
    console.log('getAccessTokenForServer ', getAccessTokenForServer);
    getAccessTokenForServer().then((token) => {
        console.log('serverKeyToken ', token);
        res.send({"serverKeyToken": token});
    });
});

// app.post('/add-new-device', (req, res) => {
//     //console.log('req ', req);
//     console.log('req.body ', req.body);
//     console.log(req.body.clientDeviceToken);

//     notificationManager.addDeviceToken(req.body.clientDeviceToken);

//     // call the function of the class NotificationManager to add device token to database
//     res.end('Received /add-new-device');
// });

app.post('/add-new-device', (req, res) => {
    //console.log('req ', req);
    console.log('req.body ', req.body);
    console.log(req.body.clientDeviceToken);

    notificationManager.addDeviceToken(req.body.clientDeviceToken);

    // call the function of the class NotificationManager to add device token to database
    res.end('Received /add-new-device');
});

// implement code for sending messages to ui based on notification date time for each work

app.get('/', (req, res) => {
    console.log('In the Server App!!');
    res.send('In the Server App!!!!');
});



app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});