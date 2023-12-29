var util = require('util');
var events = require('events');
var axios = require('axios');

function apiGetWork() {};

util.inherits(apiGetWork, events.EventEmitter);

const apiUrl = 'http://127.0.0.1:3000/notification/work';

apiGetWork.prototype.command = function(id, success) {
    const opts = {
        data: {
            "id": id
        }
    };
    axios.get(apiUrl, opts)
            .then((resp) => {
                console.log('resp.data ', resp.data);
                success(resp);
                this.emit('complete');
            })
            .catch(err => {
                console.log('Unable to get all works!! ', err);
                return;
            });
}

module.exports = apiGetWork;