
const { firebase, db } = require('../firebase.js');
const Device = require('../models/deviceModel.js');
const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query, 
    where,
    and
} = require('firebase/firestore');

// const devicesRef = db.collection('users/'+userId+'/devices');

// const createDevice = (req, res, next) => {
//     const data = req.body;
//     addDoc(collection(db, 'users'+firebase.auth().currentUser.uid+'/devices'), data)
//         .then(resp => {
//             console.log('Device added successfully!! ', resp);
//             res.status(200).send('Device created successfully!!');
//         })
//         .catch(err => {
//             console.log('Unable to add device ', err);
//             res.status(400).send(err.message);
//         });
// }

const createDevice = (req, res, next) => {
    const data = req.body;
    console.log('data ', data);
    let userId;
    // userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2000';
    userId = auth.currentUser.uid;
    // console.log('auth.currentUser.uid ', auth.currentUser.uid);
    console.log('users/'+userId+'/devices');
    console.log('auth.currentUser.uid ', auth.currentUser.uid);
    if(auth.currentUser) {
        // // check if the device_token already exists
        // const q = query(collection(db, 'users/'+userId+'/devices'), where('device_token', '==', data));
        var q;
        if (data.device_token) {
            q = query(collection(db, 'users/'+userId+'/devices'), where("device_token", "==", data.device_token));

            getDocs(q).then(docs => {
                docs.forEach(doc => {
                    console.log('doc.id ', doc.id, ' doc.data() ', doc.data(), ' docs.size ', docs.size);
                })
    
                if(docs.size >= 1) {
                    // record already exists
                    // no insert required
                    console.log('Device already exists!!');
                    res.status(400).send({message: 'Device already exists!!'});
                } else {
                    // // if it exists then dont add it to the database
                    // // otherwise add it to the database
    
                    addDoc(collection(db, 'users/'+userId+'/devices'), data)
                    .then(resp => {
                        console.log('Able to add device !! ');
                        res.status(200).send({message: 'Device added successfully!!'});
                    })
                    .catch(err => {
                        console.log('Unable to add device !!! ', err);
                        res.status(400).send({ message: err.message });
                    })    
                }
            })
        } else {
            res.status(400).send('device_token is missing');
        }
    }
}

const createTempDocumentInTemp = (req, res, next) => {
    const data = req.body;
    console.log('data ', data);
    let userId;
    // userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2000';
    userId = auth.currentUser.uid;
    // console.log('auth.currentUser.uid ', auth.currentUser.uid);
    console.log('users/'+userId+'/temp');
    console.log('auth.currentUser.uid ', auth.currentUser.uid);
    if(auth.currentUser) {
        // // check if the device_token already exists
        // const q = query(collection(db, 'users/'+userId+'/temp'), where('device_token', '==', data));

        // getDocs()

        // // if it exists then dont add it to the database
        // // otherwise add it to the database

        


        addDoc(collection(db, 'users/'+userId+'/temp'), data)
        .then(resp => {
            console.log('Able to add device !! ');
            res.status(200).send({message: 'Temp added successfully!!'});
        })
        .catch(err => {
            console.log('Unable to add temp !!! ', err);
            res.status(400).send({ message: err.message});
        })    
    }
}

const deleteDevice = (req, res, next) => {
    console.log('req.body ', req.body);
    const device_token = req.body.device_token;
    let userId;
    // userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2000';
    userId = auth.currentUser.uid;
    // console.log('users/'+userId+'/devices/');
    if(auth.currentUser) {
        // get all docs with that token
        const q = query(collection(db, 'users/'+userId+'/devices'), where("device_token", "==", device_token));

        getDocs(q).then(docs => {
            docs.forEach(doc => {
                console.log('doc.data() ', doc.data());
                // console.log('doc.ref ', doc.ref);
                deleteDoc(doc.ref).then(resp => {
                    console.log('Device deleted successfully!! ', resp);
                    res.status(200).send({message: 'Device deleted successfully!!'});
                })
                .catch(err => {
                    console.log('Unable to delete device!! ', req.body.device_token);
                    res.status(400).send({ message: err.message});
                })
            })
        })

        // deleteDoc(doc(db, 'users/'+userId+'/devices', id))
        // .then(resp => {
        //     console.log('Device deleted successfully!! ', resp);
        //     res.status(200).send('Device deleted successfully!!');
        // })
        // .catch(err => {
        //     console.timeLog('Unable to delete device!!! ', err);
        //     res.status(400).send(err.message);
        // });
    }
}

const getAllWorks = (req, res, next) => {
    console.log('req.body ', req.body);
    const device_token = req.body.device_token;
    let userId;
    // userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2000';

    userId = auth.currentUser.uid;
    console.log('auth.currentUser.uid ', auth.currentUser.uid);
    if(auth.currentUser) {
        // // check if the device_token already exists
        // const q = query(collection(db, 'users/'+userId+'/temp'), where('device_token', '==', data));

        // getDocs()

        // // if it exists then dont add it to the database
        // // otherwise add it to the database

        const q = query(collection(db, 'users/'+userId+'/work_details'));

        var allWorks = [];
        var allWorksSize;
        var i = 0;
        getDocs(q).then(docs => {
            allWorksSize = docs.size;
            docs.forEach(doc => {
                // console.log('doc.id ', doc.id, ' doc.data() ', doc.data(), ' docs.size ', docs.size);
                var work = {
                    "id": doc.id,
                    "data": doc.data()
                }
                allWorks.push(work);
                i++;
                // console.log('i ', i);    
            });
            if (i === allWorksSize) {
                res.status(200).send(allWorks);
            }
        })
        .catch(err => {
            console.log('Unable to get all works !! ', err);
            res.status(403).send({"message": "Unable to get all workd!! "+err});
        })
    }
}

const getAWork = (req, res, next) => {

    console.log('req.body ', req.body);
    const device_token = req.body.device_token;

    let userId;
    // userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2000';

    userId = auth.currentUser.uid;
    console.log('auth.currentUser.uid ', auth.currentUser.uid);
    if(auth.currentUser) {
        // // check if the device_token already exists
        // const q = query(collection(db, 'users/'+userId+'/temp'), where('device_token', '==', data));

        // getDocs()

        // // if it exists then dont add it to the database
        // // otherwise add it to the database

        var d;
        if (req.body.id) {
            d = doc(db, 'users/'+userId+'/work_details', req.body.id);
        } else {
            console.log('No Id to retreive work!! ');
            res.status(403).send('No Id to retreive work!! ');
        }

        getDoc(d).then(doc => {
            console.log('doc.data() ', doc.data());
            var work = {
                "id": doc.id,
                "data": doc.data()
            }
            console.log('work ', work);
            res.status(200).send(work);
        })
        .catch(err => {
            console.log('Unable to get work for ', req.body.id, " .. ", err);
            res.status(403).send({"message": "Unable to get work for id "+req.body.id+" .. "+err.message});
        })
    }
}

const getWorkByName = (req, res, next) => {

    console.log('req.body ', req.body);
    const workName = req.body.work_name;
    const compl = req.body.completed;

    console.log('workName ', workName, ' completed ', compl);

    if(!workName || (compl == undefined)) {
        console.log('work_name or completed is missing in request ', workName, compl);
        res.status(403).send({"message":"Provide work_name and completed!"});
    }

    let userId;
    // userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2000';

    userId = auth.currentUser.uid;
    console.log('auth.currentUser.uid ', auth.currentUser.uid);
    if(auth.currentUser) {
        // // check if the device_token already exists
        // const q = query(collection(db, 'users/'+userId+'/temp'), where('device_token', '==', data));

        // getDocs()

        // // if it exists then dont add it to the database
        // // otherwise add it to the database

        const q = query(collection(db, 'users/'+userId+'/work_details'), and(where('work_name', '==', workName), where('completed', '==', compl)));

        var workByName = [];
        var workByNameSize;
        var i = 0;
        getDocs(q).then(docs => {
            workByNameSize = docs.size;
            docs.forEach(doc => {
                // console.log('doc.id ', doc.id, ' doc.data() ', doc.data(), ' docs.size ', docs.size);
                var work = {
                    "id": doc.id,
                    "data": doc.data()
                }
                workByName.push(work);
                i++;
                // console.log('i ', i);    
            });
            if (i === workByNameSize) {
                res.status(200).send(workByName);
            }
        })
        .catch(err => {
            console.log('Unable to get all works !! ', err);
            res.status(403).send({"message": "Unable to get all workd!! "+err});
        })
    }
}



module.exports = {
    createDevice,
    deleteDevice,
    getAllWorks,
    getAWork,
    createTempDocumentInTemp,
    getWorkByName
}