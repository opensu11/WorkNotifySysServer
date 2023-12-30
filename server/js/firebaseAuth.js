const { google } = require('googleapis');
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];


// console.log('process.env.GOOGLE_APPLICATION_CREDENTIALS ', process.env.GOOGLE_APPLICATION_CREDENTIALS);
// const key = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const key = {
    "type": "service_account",
    "project_id": "work-notifications-edc6e",
    "private_key_id": "655ea8504f77f65a418829100ab2ae0bd5f7fd19",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyQFU4qCj86NvO\nflU1A2AaoOWqW/MMai/EmgKQNVLFrC7H7jei0SNZh7FGURnlGGVPXmmflRkCv/eC\nHQwhX2aXAq+lgYnVNCRqlCi2U3Zb/5TZr+GJGrOkhaMRE63pR/Tygq08iMnGpveo\nKoSQ0GS8Sa9wnSk4hvKa4QkSIqv9Yi9ewD2mmLAj5VaDlFRDMQ/dvwdb1VhBauyR\n0IIETlGSH3wgvd0OfdoZObM8IcI6eRsePdtZpOC0mb8HWk0p/UJcXksCD8qFtgqi\nw9Knfw6iyyyWvxU13Sfu6wQcDMUnWQxnSIQsy0WSbsiU7k93Fq6Q1mkqfEdLTQSF\nYqjFNwRDAgMBAAECggEALGS9VMj8vFA6PilUi0l16+vahx0zYQopL2uz67p8DOMf\nG4gGrzQq+6dBzWNxcY8r3CKFZ8s4WWj5+ZvGY6Fg6Ycvu6aRb1n3H9wab55Fwg/b\nQIP/RagyyWzG+f/OtmTHaoaFIqhmqGT5FRbRwUdFb2dinEdn9r4VOeGF4tBjyUz5\nNqFwnm33ccCIxzgaxtXFbPdIZXAvLT3t2KWc1+LWsPVGaY5GCPMIF6kp0isoac+L\nz7FAnOebw4HmRSDtXyuO1d0RMZCg36lXbmDeJ0WlBRbxXyghu+573zTH/BnF5kUr\nYKQGwBRPv2YcADjhDg37eZwDFiGnsNob3izq4OCCYQKBgQD3VeCqYacR5zLBYHo6\nujzpjnVqn7/f3GPcAKf4M7Hm7ReN7VVywbJeEFlvEd4gG62ue53oyt4SuDcfGjzy\nbdNRmjpspEzG9JMWRjOMrBaAWdQHx8uPe/hQgjsti86wnHTsWsDzwc/q+kMZNdes\nWE6BlGBjwjVOT0Ujqs/5D/TH+QKBgQC4fudNwiCMNFqVxLMdyVBOi1DuYEo5CfJo\nM8A2yi92yZt/rQN6J0LbgpkpWvbldCZGKGVIgWj4aQU2UrL5rcBCW4DUMWC6mUn9\nztXHMARUBZYE352m+dnto3JGKNLcrJiAMm6qvA2lAWo2WITAr7Bn1xvjTqsyygA2\njHPdopKVGwKBgDfTIkpSkCryS/pplCz9LBJrHQVb2Srly4Q0gbT7tgOxL8fQ8aBd\nJ60jc4wmNER6+tCPBi0s3MLM4WQbv/XX5AJfFSDAVLPzL9+vKKNvlASUQc8fwUo5\naOqC+mhlTdl+9sUCFtrtu8gFhG+EP5GevNlya+8YPn/WVHygaSCGAXHBAoGAEK9x\nbcfbt7JYaukSJeR5/dB9rkFJFSWAJcpgXNQmPMD47jAQe3CnjECgZ2wRnijF+VxX\n5JnHi4e77/DEvO3o0FeELCyXCekpFuoozU3bZlnm+mPa1yoLeoFoqU2x3EFDvXxS\nI+DD/yNEnsucneyFsK50mDcaJoq8QDKtm+LDDPcCgYAZkRHDXVbv7DjMcgaTlzGF\nORNFDS2Ztvvx1FmiTNYQ7zACLS1wujjSCsW6EUXLgoQhBbjoPzROz3PPaVBRH3Mw\ngtuqE6ZvLnAxERXKfm21dnPfd3GDicbIGs9UAn70HA4e1Tp6vNrPOz7J1jO5oOI9\nFXjU2Zvr6/qNZ+6Xh6r3cA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-7icxc@work-notifications-edc6e.iam.gserviceaccount.com",
    "client_id": "104316129484963861558",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7icxc%40work-notifications-edc6e.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
// console.log('key ', key);



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