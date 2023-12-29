const { firebase, db, auth } = require('./firebaseLoginHelper');
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

const getData = (collectionPath) => {

}

const getDataWhere = (collectionPath, forDeviceToken) => {
    const q = query(collection(db, collectionPath), where('device_token', '==', forDeviceToken));
    console.log('getDataWhere 1');
    return getDocs(q);
}

const getDataWhereTest = (collectionPath, forDeviceToken) => {
    console.log('collectionPath ', collectionPath);
    const q = query(collection(db, collectionPath), where('device_token', '==', forDeviceToken));
    getDocs(q)
        .then(docs => {
            // console.log('Able to get device!! ', resp);
            console.log('docs.size ', docs.size);
            docs.forEach((doc) => {
                console.log('doc.id ', doc.id);
                console.log('doc.data() ', doc.data());
            })
        })
        .catch(err => {
            console.log('Unable to get device!! ', err);
        })
}

module.exports = {
    getData,
    getDataWhere,
    getDataWhereTest
}