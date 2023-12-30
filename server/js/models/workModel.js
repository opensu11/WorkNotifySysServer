const serverConfig = require('../../serverConfig');
const { config } = require('../../serverConfig');
const { getAccessTokenForServer } = require('../firebaseAuth');

class Work {
    constructor(data) {
        (this.work_name = data.work_name);
        (this.start_date_time = data.start_date_time);
        (this.end_date_time = data.end_date_time);
        (this.actual_start_date = data.actual_start_date);
        (this.device_token = data.device_token);
        (this.delay_reason = data.delay_reason);
        (this.completed = data.completed);
    }

    sendNotification () {
        // send notification message to the device with device_token
        console.log('Sending notification for ', this.work_name, ' with delay_reason ', this.delay_reason);

        // find out the latest server key token
        // add it to the header of the request to send notification
        // then use the client device token to send the notification

        getAccessTokenForServer()
            .then((serverKeyToken) => {
                // console.log('serverKeyToken ', serverKeyToken);
                const options = {
                    "method": "POST",
                    "headers": {
                        "Authorization": `Bearer ${serverKeyToken}`,
                        "content-type": "application/json"    
                    },
                    "body": JSON.stringify({
                        "message": {
                            "token": this.device_token,
                            "notification": {
                                "title": "Work Notification",
                                "body": `Your ${this.work_name} is due in ${this.start_date_time}`
                            }
                        }
                    })
                }
        
                // console.log('options ', options);
        
                fetch('https://fcm.googleapis.com/v1/projects/work-notifications-edc6e/messages:send', options)
                    .then(resp => {
                        console.log('Able to send notification for ', this.work_name);
                        // console.log('resp for sending notification ', resp);
                    })
                    .catch(err => {
                        console.log('Unable to send notification for ', this.work_name, ' because of ', err);
                    })
        
            })
            .catch(err => {
                console.log('Unable to generate Server key token ', err);
            });

    }

}

module.exports = Work;