const NotificationManagement = require('./notification_manager');

class NotificationManagement {

    constructor() {
        if(!this.notificationManager) {
            this.notificationManager = new NotificationManager();
        }
    }

    getInstance() {
        return NotificationManagement;
    }
    
}