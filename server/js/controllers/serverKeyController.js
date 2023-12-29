const firebase = require('../firebase.js');
const { getAccessTokenForServer } = require('../firebaseAuth.js');

const generateServerKeyToken = (req, res, next) => {
    getAccessTokenForServer()
        .then((token) => {
            console.log('serverKeyToken ', token);
            res.send({"serverKeyToken": token});
        })
        .catch(err => {
            console.log('Unable to generate Server key token ', err);
            res.status(400).send(err.message);
        });
}

module.exports = {
    generateServerKeyToken
}