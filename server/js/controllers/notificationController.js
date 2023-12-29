const Device = require('../models/workModel');
const { firebase, db, auth } = require('../firebase');
const Work = require('../models/workModel');
const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    query,
    and,
    where,
    updateDoc,
    deleteDoc
} = require('firebase/firestore');

// Every hour
// check for any notifications
// in 4 hours
// in 24 hours
// in 72 hours
// and if yes
// send notifications to their device

const checkForNotifications = () => {
    // query all documents when called
    // and for any data within 4 hours, 24 hours, 72 hours
    // send notification

    this.timeframes = [[0,4], [20, 24], [68, 72]];

    // console.log('this.timeframes ', this.timeframes);

    var worksForNotification;

    // 1st implementation
    // this.timeframes.forEach((notificationInterval) => {
    //     // getWorkForTimeframeNotifications(notificationInterval[0], notificationInterval[1])
    //     //     .then((worksForNotification) => {
    //     //         console.log('worksForNotification in checkForNotifications ', worksForNotification);
    //     //         worksForNotification.forEach((workObj) => {
    //     //             workObj.sendNotification();
    //     //         })        
    //     //     })
    //     //     .catch(err => {
    //     //         console.log('Unable to get works for notification ', err);
    //     //     })

    //     getWorkForTimeframeNotifications3(this.timeframes)
    //         .then((worksForNotification) => {
    //             console.log('worksForNotification in checkForNotifications ', worksForNotification);
    //             worksForNotification.forEach((workObj) => {
    //                 workObj.sendNotification();
    //             })        
    //         })
    //         .catch(err => {
    //             console.log('Unable to get works for notification ', err);
    //         })
    // });


    // 2nd Implementation
    try {
        getWorkForTimeframeNotifications3(this.timeframes)
        .then((worksForNotification) => {
            // console.log('worksForNotification in checkForNotifications ', worksForNotification);
            worksForNotification.forEach((workObj) => {
                workObj.sendNotification();
            })        
        })
        .catch(err => {
            console.log('Unable to get works for notification ', err);
        })
    } catch(error) {
        console.log('Unable to query database for work to notify !! ', error);
    }

}

// const getWorkForTimeframeNotifications = (fromTime, toTime) => {
//     const dateNow = new Date().getTime();
//     const compareFromTime = dateNow - (1000*60*60*fromTime);
//     let userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2';

//     // console.log('auth ', auth);

//     if(auth.currentUser) {
//         console.log('auth.currentUser.uid ', auth.currentUser.uid);


    
//         // Actual production code
//         // const q = query(collection(db, 'users/'+auth.currentUser.uid+'/work_details'),  and(where('start_date_time', '<=', fromTime), where('start_date_time', '<', toTime)));
    
//         console.log('fromTime, toTime ', fromTime, toTime);
//         let nowDate = new Date();
//         console.log('nowDate: ', nowDate.toLocaleDateString(), nowDate.toLocaleTimeString());
//         console.log('before adding hours nowDate is ', nowDate.toLocaleDateString('en-US'), nowDate.toLocaleTimeString('en-US'));
//         // console.log('nowDate.setHours(nowDate.getHours() + 4 ', nowDate.setHours(nowDate.getHours()+4));
//         console.log('after adding hours, nowDate is ', nowDate.toLocaleDateString('en-US'), nowDate.toLocaleTimeString('en-US'));

//         var upperLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
//         var lowerLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
//         upperLimitTime.setHours(nowDate.getHours()+toTime);
//         lowerLimitTime.setHours(nowDate.getHours()+fromTime);

//         console.log('upperLimitTime, lowerLimitTime ', upperLimitTime.toLocaleDateString(), upperLimitTime.toLocaleTimeString(), lowerLimitTime.toLocaleDateString(), lowerLimitTime.toLocaleTimeString());

//         console.log('nowDate.getTimezoneOffset ', nowDate.getTimezoneOffset());

//         // Testing only
//         // const q = query(collection(db, 'users/'+auth.currentUser.uid+'/work_details'),  where('completed', '==', false));
//         const q = query(collection(db, 'users/'+auth.currentUser.uid+'/work_details'),  and(where('start_date_time', '<=', upperLimitTime), where('start_date_time', '>', lowerLimitTime)));
    
//         getDocs(q).then((works) => {
//             // console.log('works ', works);
//             works.forEach(work => {
//                 console.log('work.id ', work.id);
//                 console.log('work.data() ', work.data());
//                 console.log('work.data().start_date_time in date ', new Date(work.data().start_date_time));
//             })
//         });    
//     }
//     return [];
// }


const getWorkForTimeframeNotifications = (fromTime, toTime) => {
    const dateNow = new Date().getTime();
    const compareFromTime = dateNow - (1000*60*60*fromTime);
    let userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2';
    var worksForNotification = [];

    // console.log('auth ', auth);

    if(auth.currentUser) {
        // console.log('auth.currentUser.uid ', auth.currentUser.uid);

        // console.log('fromTime, toTime ', fromTime, toTime);
        let nowDate = new Date();
        // console.log('nowDate: ', nowDate.toLocaleDateString(), nowDate.toLocaleTimeString());
        // console.log('before adding hours nowDate is ', nowDate.toLocaleDateString('en-US'), nowDate.toLocaleTimeString('en-US'));
        // console.log('nowDate.setHours(nowDate.getHours() + 4 ', nowDate.setHours(nowDate.getHours()+4));
        // console.log('after adding hours, nowDate is ', nowDate.toLocaleDateString('en-US'), nowDate.toLocaleTimeString('en-US'));

        var upperLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
        var lowerLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
        upperLimitTime.setHours(nowDate.getHours()+toTime);
        lowerLimitTime.setHours(nowDate.getHours()+fromTime);

        console.log('upperLimitTime, lowerLimitTime ', upperLimitTime.toLocaleDateString(), upperLimitTime.toLocaleTimeString(), lowerLimitTime.toLocaleDateString(), lowerLimitTime.toLocaleTimeString());

        const q = query(collection(db, 'users/'+auth.currentUser.uid+'/work_details'));
        let workStartDate;
        var workM;
        // return new Promise((resolve, reject) => {
        //     getDocs(q).then((works) => {
        //         // console.log('works ', works);
        //         works.forEach(work => {
        //             // console.log('work.id ', work.id);
        //             // console.log('work.data() ', work.data());
                    
        //             workStartDate = new Date(work.data().start_date_time);
    
        //             console.log('work.data().start_date_time in date ', workStartDate);
    
        //             if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
        //                 console.log('work falls in range ', upperLimitTime, lowerLimitTime);
        //                 console.log('fromTime, toTime ', fromTime, toTime);
        //                 workM = new Work(work.data());
        //                 //console.log(workM);
        //                 worksForNotification.push(workM);
        //             }
        //         })
        //         console.log('worksForNotification in getDocs ', worksForNotification);
        //         resolve(worksForNotification);
        //     })
        //     .catch(err => {
        //         reject('Unable to get data from database!! ', err);
        //     })           
        // })

        // Doesnt work and it resolved blank before the values are populated
        return new Promise((resolve, reject) => {
            getDocs(q).then((works) => {
                // console.log('works ', works);
                works.forEach(work => {
                    // console.log('work.id ', work.id);
                    // console.log('work.data() ', work.data());
                    
                    workStartDate = new Date(work.data().start_date_time);
    
                    console.log('work.data().start_date_time in date ', workStartDate);
    
                    if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
                        console.log('work falls in range ', upperLimitTime, lowerLimitTime);
                        console.log('fromTime, toTime ', fromTime, toTime);
                        workM = new Work(work.data());
                        //console.log(workM);
                        worksForNotification.push(workM);
                        console.log('workForNotificaitons length ', worksForNotification.length);
                    }
                })
                console.log('worksForNotification in getDocs ', worksForNotification);
            })
            .catch(err => {
                reject('Unable to get data from database!! ', err);
            });
            resolve(worksForNotification);
        });

        // return getDocs(q).then((works) => {
        //             // console.log('works ', works);
        //             works.forEach(work => {
        //                 // console.log('work.id ', work.id);
        //                 // console.log('work.data() ', work.data());
                        
        //                 workStartDate = new Date(work.data().start_date_time);
        
        //                 console.log('work.data().start_date_time in date ', workStartDate);
        
        //                 if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
        //                     console.log('work falls in range ', upperLimitTime, lowerLimitTime);
        //                     console.log('fromTime, toTime ', fromTime, toTime);
        //                     workM = new Work(work.data());
        //                     //console.log(workM);
        //                     worksForNotification.push(workM);
        //                 }
        //             })
        //             console.log('worksForNotification in getDocs ', worksForNotification);
        //         })
        //         .catch(err => {
        //             reject('Unable to get data from database!! ', err);
        //         });
    }
}


const getWorkForTimeframeNotifications2 = (timeframes) => {
    let userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2';
    var worksForNotification = [];

    // console.log('auth ', auth);

    if(auth.currentUser) {

        const q = query(collection(db, 'users/'+auth.currentUser.uid+'/work_details'));
        let workStartDate;
        var workM;

        // return new Promise((resolve, reject) => {
        //     getDocs(q).then((works) => {
        //         // console.log('works ', works);
        //         works.forEach(work => {
        //             // console.log('work.id ', work.id);
        //             // console.log('work.data() ', work.data());
                    
        //             workStartDate = new Date(work.data().start_date_time);
    
        //             console.log('work.data().start_date_time in date ', workStartDate);
    
        //             if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
        //                 console.log('work falls in range ', upperLimitTime, lowerLimitTime);
        //                 console.log('fromTime, toTime ', fromTime, toTime);
        //                 workM = new Work(work.data());
        //                 //console.log(workM);
        //                 worksForNotification.push(workM);
        //             }
        //         })
        //         console.log('worksForNotification in getDocs ', worksForNotification);
        //         resolve(worksForNotification);
        //     })
        //     .catch(err => {
        //         reject('Unable to get data from database!! ', err);
        //     })           
        // })

        // Doesnt work and it resolved blank before the values are populated
        // return new Promise((resolve, reject) => {
        //     getDocs(q).then((works) => {
        //         // console.log('works ', works);

        //         timeframes.forEach((notificationInterval) => {
        //             let nowDate = new Date();

        //             var upperLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
        //             var lowerLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
        //             upperLimitTime.setHours(nowDate.getHours()+toTime);
        //             lowerLimitTime.setHours(nowDate.getHours()+fromTime);
            
        //             console.log('upperLimitTime, lowerLimitTime ', upperLimitTime.toLocaleDateString(), upperLimitTime.toLocaleTimeString(), lowerLimitTime.toLocaleDateString(), lowerLimitTime.toLocaleTimeString());            

        //             works.forEach(work => {
        //                 // console.log('work.id ', work.id);
        //                 // console.log('work.data() ', work.data());
                        
        //                 workStartDate = new Date(work.data().start_date_time);
        
        //                 console.log('work.data().start_date_time in date ', workStartDate);
        
        //                 if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
        //                     console.log('work falls in range ', upperLimitTime, lowerLimitTime);
        //                     console.log('fromTime, toTime ', fromTime, toTime);
        //                     workM = new Work(work.data());
        //                     //console.log(workM);
        //                     worksForNotification.push(workM);
        //                     console.log('workForNotificaitons length ', worksForNotification.length);
        //                 }
        //             })
        //             resolve(worksForNotification);    
        //         })
        //         console.log('worksForNotification in getDocs ', worksForNotification);
        //     })
        //     .catch(err => {
        //         console.log('Unable to get data from database!! ', err);
        //         reject('Unable to get data from database!! ');
        //     });

        // });

        // return getDocs(q).then((works) => {
        //             // console.log('works ', works);
        //             works.forEach(work => {
        //                 // console.log('work.id ', work.id);
        //                 // console.log('work.data() ', work.data());
                        
        //                 workStartDate = new Date(work.data().start_date_time);
        
        //                 console.log('work.data().start_date_time in date ', workStartDate);
        
        //                 if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
        //                     console.log('work falls in range ', upperLimitTime, lowerLimitTime);
        //                     console.log('fromTime, toTime ', fromTime, toTime);
        //                     workM = new Work(work.data());
        //                     //console.log(workM);
        //                     worksForNotification.push(workM);
        //                 }
        //             })
        //             console.log('worksForNotification in getDocs ', worksForNotification);
        //         })
        //         .catch(err => {
        //             reject('Unable to get data from database!! ', err);
        //         });
    }
}

const getWorkForTimeframeNotifications3 = (timrframes) => {
    let userId = 'sTu42UGVv3aM5AwVQ58IhzaCIOT2';
    var worksForNotification = [];
    const isNotCompleted = true;

    // console.log('auth ', auth);

    if(auth.currentUser) {
        const upperLowerRanges = getUpperLowerRange(this.timeframes);

        const q = query(collection(db, 'users/'+auth.currentUser.uid+'/work_details'), where('completed', '==', !isNotCompleted));
        let workStartDate;
        var workM;
        // return new Promise((resolve, reject) => {
        //     getDocs(q).then((works) => {
        //         // console.log('works ', works);
        //         works.forEach(work => {
        //             // console.log('work.id ', work.id);
        //             // console.log('work.data() ', work.data());
                    
        //             workStartDate = new Date(work.data().start_date_time);
    
        //             console.log('work.data().start_date_time in date ', workStartDate);
    
        //             if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
        //                 console.log('work falls in range ', upperLimitTime, lowerLimitTime);
        //                 console.log('fromTime, toTime ', fromTime, toTime);
        //                 workM = new Work(work.data());
        //                 //console.log(workM);
        //                 worksForNotification.push(workM);
        //             }
        //         })
        //         console.log('worksForNotification in getDocs ', worksForNotification);
        //         resolve(worksForNotification);
        //     })
        //     .catch(err => {
        //         reject('Unable to get data from database!! ', err);
        //     })           
        // })

        // Doesnt work and it resolved blank before the values are populated
        let worksQueried = 0;
        return new Promise((resolve, reject) => {
            getDocs(q).then((works) => {
                // console.log('works ', works);
                // console.log('works.size ', works.size);
                works.forEach(work => {
                    // console.log('work.id ', work.id);
                    // console.log('work.data() ', work.data());
                    
                    workStartDate = new Date(work.data().start_date_time);
    
                    console.log('work.data().start_date_time in date ', workStartDate);
    
                    console.log('upperLowerRanges.upperLimitTime0 ', upperLowerRanges.upperLimitTime0);
                    console.log(upperLowerRanges.lowerLimitTime0);
                    if (upperLowerRanges.upperLimitTime0 >= workStartDate && upperLowerRanges.lowerLimitTime0 < workStartDate) {
                        console.log('work falls in range ', upperLowerRanges.upperLimitTime0, upperLowerRanges.lowerLimitTime0);
                        workM = new Work(work.data());
                        //console.log(workM);
                        worksForNotification.push(workM);
                        // console.log('workForNotificaitons length ', worksForNotification.length);
                    }

                    console.log('upperLowerRanges.upperLimitTime1 ', upperLowerRanges.upperLimitTime1);
                    console.log(upperLowerRanges.lowerLimitTime1);
                    // console.log('upperLowerRanges.upperLimitTime1 >= workStartDate ', upperLowerRanges.upperLimitTime1 >= workStartDate);
                    // console.log('upperLowerRanges.lowerLimitTime1 < workStartDate ', upperLowerRanges.lowerLimitTime1 < workStartDate);
                    // console.log('upperLimitTime1 - workStartDate ', upperLowerRanges.upperLimitTime1 - workStartDate);
                    // console.log('lowerLimitTime1 - workStartDate ' , upperLowerRanges.lowerLimitTime1 - workStartDate);
                    if (upperLowerRanges.upperLimitTime1 >= workStartDate && upperLowerRanges.lowerLimitTime1 < workStartDate) {
                        console.log('work falls in range ', upperLowerRanges.upperLimitTime1, upperLowerRanges.lowerLimitTime1);
                        workM = new Work(work.data());
                        //console.log(workM);
                        worksForNotification.push(workM);
                        // console.log('workForNotificaitons length ', worksForNotification.length);
                    }

                    console.log('upperLowerRanges.upperLimitTime2 ', upperLowerRanges.upperLimitTime2);
                    console.log(upperLowerRanges.lowerLimitTime2);
                    if (upperLowerRanges.upperLimitTime2 >= workStartDate && upperLowerRanges.lowerLimitTime2 < workStartDate) {
                        console.log('work falls in range ', upperLowerRanges.upperLimitTime2, upperLowerRanges.lowerLimitTime2);
                        workM = new Work(work.data());
                        //console.log(workM);
                        worksForNotification.push(workM);
                        // console.log('workForNotificaitons length ', worksForNotification.length);
                    }
                    worksQueried++;
                })
                console.log('worksForNotification in getDocs ', worksForNotification);
                // console.log('worksQueried ', worksQueried, 'works.size ', works.size);
                if (worksQueried === works.size) {
                    // completed all query documents
                    resolve(worksForNotification);
                }
            })
            .catch(err => {
                reject('Unable to get data from database!! ', err);
            });
        });

        // return getDocs(q).then((works) => {
        //             // console.log('works ', works);
        //             works.forEach(work => {
        //                 // console.log('work.id ', work.id);
        //                 // console.log('work.data() ', work.data());
                        
        //                 workStartDate = new Date(work.data().start_date_time);
        
        //                 console.log('work.data().start_date_time in date ', workStartDate);
        
        //                 if (upperLimitTime >= workStartDate && lowerLimitTime < workStartDate) {
        //                     console.log('work falls in range ', upperLimitTime, lowerLimitTime);
        //                     console.log('fromTime, toTime ', fromTime, toTime);
        //                     workM = new Work(work.data());
        //                     //console.log(workM);
        //                     worksForNotification.push(workM);
        //                 }
        //             })
        //             console.log('worksForNotification in getDocs ', worksForNotification);
        //         })
        //         .catch(err => {
        //             reject('Unable to get data from database!! ', err);
        //         });
    }
}

// not tested
const getUpperLowerRange = (timeframes) => {

    // console.log('auth.currentUser.uid ', auth.currentUser.uid);

    // console.log('fromTime, toTime ', fromTime, toTime);
    let nowDate = new Date();
    // console.log('nowDate ', nowDate);
    console.log('nowDate: ', nowDate.toLocaleDateString(), nowDate.toLocaleTimeString());
    // console.log('before adding hours nowDate is ', nowDate.toLocaleDateString('en-US'), nowDate.toLocaleTimeString('en-US'));
    // console.log('nowDate.setHours(nowDate.getHours() + 4 ', nowDate.setHours(nowDate.getHours()+4));
    // console.log('after adding hours, nowDate is ', nowDate.toLocaleDateString('en-US'), nowDate.toLocaleTimeString('en-US'));

    let i=0;
    let upperLowerRanges = {};
    timeframes.forEach(notificationInterval => {
        console.log('notificationInterval ', notificationInterval);
        let toTime = notificationInterval[1];
        let fromTime = notificationInterval[0];

        var upperLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
        var lowerLimitTime = new Date(JSON.parse(JSON.stringify(nowDate)));
        upperLimitTime.setHours(nowDate.getHours()+toTime);
        lowerLimitTime.setHours(nowDate.getHours()+fromTime);

        upperLowerRanges["upperLimitTime"+i] = upperLimitTime;
        // upperLowerRanges[i].data = upperLimitTime;

        upperLowerRanges["lowerLimitTime"+i] = lowerLimitTime;
        // upperLowerRanges[i].data = lowerLimitTime;
        
        i++;
    })
    console.log('upperLowerRanges ', upperLowerRanges);

    return upperLowerRanges;
}

module.exports = {
    checkForNotifications
}