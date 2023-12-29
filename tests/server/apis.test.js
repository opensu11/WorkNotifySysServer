const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const axios = require('axios');
const { firebase, db, auth } = require('../firebaseHelpers/firebaseLoginHelper');
const { getData, getDataWhere, getDataWhereTest } = require('../firebaseHelpers/firestoreDataAccess');
const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    where,
    and,
    query
} = require('firebase/firestore');

chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
chai.should();

var api;


describe('test all apis', () => {

    beforeEach(() => {
        api = axios.create({baseURL: 'http://127.0.0.1:3000'});
    });

    describe ('test /notification/generate-server-token', () => {

        it('9.0 == 4+5', () => {
            // call post function to add-device api
            // and validate the return values for correctness
            expect(9.0).to.equal(4+5);
        });
    
        it('should get response ', () => {
            
            // console.log('api ', api);
            // return api.get('/notification/generate-server-token')
            //         .then(resp => {
            //             console.log('resp.data ', resp.data);
            //             console.log('resp.status ', resp.status);
            //             expect(1).to.equal(2);
            //             expect(resp).to.have.property('status', 400);
            //         })
            //         .catch(err => {
            //             expect(false);
            //         });
            return api.get('/notification/generate-server-token').should.eventually.exist;
        });
    
        it('should have status 200 ', () => {
            return expect(Promise.resolve(
                api.get('/notification/generate-server-token')
            )).to.eventually.have.property('status', 200);
        });

        it('should a property data.serverKeyToken as string ', () => {
            return expect(Promise.resolve(
                api.get('/notification/generate-server-token')
            )).to.eventually.have.nested.property('data.serverKeyToken')
                .to.be.string;
        })

    });

    describe('test /notification/add-device', () => {

        it('should get response ', () => {
            return api.post('/notification/add-device', { device_token: 'asdfasdfasdf1' }).should.eventually.exist;
        });

        it('should have status 200 ', () => {
            return expect(Promise.resolve(
                api.post('/notification/add-device', { device_token: 'asdfasdfasdf2' })
            )).to.eventually.have.property('status', 200);
        });

        it('should have added the data into firestore  ', (done) => {
            // console.log('auth.currentUser ', auth.currentUser);
            // console.log('auth.currentUser.uid ', auth.currentUser.uid);

            // let q = query(collection(db, 'users/'+auth.currentUser.uid+'/devices'), where('device_token', '==', 'cWG-DbcVJknmJI9cejjA8b:APA91bG8gyeXUOagHDkpY0yQqqvVNF1uhTv_1zHjjgezIuJLgy2d6hqFTuUMOQU2yG48RWzO0_ZC2zMDNywvV_SDUYUlJMMSgA05ai-reCaiv2M49ko7jUhiJUhn9WlyvIf7AUL7KuTm'));
            // getDocs(q).then(resp => console.log('resp.size ', resp.size));

            api.post('/notification/add-device', { device_token: 'aasdfasdfasdfasdf3' })
                .then(resp => {
                    // getDataWhereTest('/users/'+auth.currentUser.uid+'/devices', 'aasdfasdfasdfasdf111');

                    // return expect(getDataWhere('users/'+auth.currentUser.uid+'/devices', 'aasdfasdfasdfasdf111333')).to.eventually.exist;
                    // console.log('resp ', resp);
                    // return expect(Promise.resolve(
                    //     getDataWhere('users/'+auth.currentUser.uid+'/devices', 'aasdfasdfasdfasdf3')
                    // )).to.eventually.have.property('size', 1);

                    let q = query(collection(db, 'users/'+auth.currentUser.uid+'/devices'), where('device_token', '==', 'aasdfasdfasdfasdf3'));
                    getDocs(q).then((docs) => {
                        // console.log('docs.size ', docs.size);
                        if(docs.size === 1) {
                            done();
                        } else {
                            done('Device not added!!');
                        }
                    }).catch(err => {
                        console.log('Unable to check added device!! ', err);
                        done('Unable to check added device!!');
                    })
                })
                .catch(err => {
                    console.log('Adding data error ', err);
                    done(err);
                })
        })

    });

    describe('test /notification/delete-device', () => {

        it('should get response ', () => {

            api.delete('/notification/delete-device', {data: { device_token: 'asdfasdfasdf1'}}).should.eventually.exist;

            // Second working way
            // const ops = {
            //     method: 'delete',
            //     headers: { 'content-type': 'application/json' },
            //     data: JSON.stringify({ 'id': 'aslkdjfasjdfasdf' }),
            //     url: 'http://127.0.0.1:3000/notification/delete-device'
            // }

            // return axios(ops).should.eventually.exist;            
        });

        it('should have status 200 ', () => {
            return expect(Promise.resolve(
                api.delete('/notification/delete-device',  { data: { device_token: 'asdfasdfasdf2' } })
            )).to.eventually.have.property('status', 200);
        });

        it('should delete a record ', () => {
            return expect(Promise.resolve(
                api.delete('/notification/delete-device', { data: { device_token: 'aasdfasdfasdfasdf3'}})
            )).to.eventually.have.property('status', 200);
            
        })

    });

});

const waitForFirebaseInit = () => {
    console.log('waited for Firebase init ');
}