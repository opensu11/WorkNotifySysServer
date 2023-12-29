var util = require('util');
var events = require('events');
var axios = require('axios');

function apiGetWorkByName() {};

util.inherits(apiGetWorkByName, events.EventEmitter);

const apiUrl = 'http://127.0.0.1:3000/notification/work-by-name';

apiGetWorkByName.prototype.command = function(work_name, compl, success) {
    const opts = {
        data: {
            "work_name": work_name,
            "completed": compl
        }
    };
    axios.get(apiUrl, opts)
            .then((resp) => {
                console.log('resp.data ', resp.data);
                success(resp);
                this.emit('complete');
            })
            .catch(err => {
                console.log('Unable to get work!! ', err);
                return;
            });
}

module.exports = apiGetWorkByName;