var util = require('util');
var events = require('events');
var axios = require('axios');

function apiGetAllWorks() {};

util.inherits(apiGetAllWorks, events.EventEmitter);

const apiUrl = 'http://127.0.0.1:3000/notification/all-works';

apiGetAllWorks.prototype.command = function(success) {
    console.log('in command of apiGetAllWorks ');
    const opt = {

    };
    axios.get(apiUrl, opt)
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

module.exports = apiGetAllWorks;