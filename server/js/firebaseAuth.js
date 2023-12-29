const { google } = require('googleapis');
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

const key = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

function getAccessTokenForServer() {

    // console.log('key ', key);

    // console.log('google ', google);
    const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
    );

    return new Promise((resolve, reject) => {
        jwtClient.authorize()
            .then((tokens) => {
                // console.log('tokens ', tokens);
                // console.log('access_token ', tokens.access_token);
                resolve (tokens.access_token);
            })
            .catch(err => {
                console.log('Unable to authenticate for Server token ', err);
                reject(err);
            });
    });
        
}

module.exports = {
    getAccessTokenForServer
};