const firebase = require('firebase/app');
const workModel = require('./models/workModel.js');
const { checkForNotifications } = require('./controllers/notificationController');

class NotificationManager {
    
    sendNotification(device, message) {
        // send notification to appropriate device
    }

    // getLatestServerKeyToken() {

    // }

    // addDeviceToken(token) {
    //     console.log('addDeviceToken adding token ', token);
    // }

    // addDeviceToken2(req, res, next) {
    //     let token = req.body.clientDeviceToken;
    //     console.log('addDeviceToken adding token ', token);
    // }

    // removeDeviceToken(token) {

    // }

    checkNotifications() {
        // check all database data to see if the data for each record in work_details
        // every hour for the following timeframes
        // less than 4 hours
        // less than 24 hours
        // less than 72 hours
        // and send notification to the device

        checkForNotifications()

    }

}

module.exports = NotificationManager;