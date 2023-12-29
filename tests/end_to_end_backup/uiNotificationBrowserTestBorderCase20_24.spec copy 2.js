const { alertcenter_v1beta1 } = require("googleapis");
const config = require('../../server/serverConfig');

module.exports = {
    // AppNotification24Hours23_59: (browser) => {
    //     // const addBtn2 = browser.element.find('.add-btn2[type="submit"]');
    //     // const addForm = browser.element.find('.add-work');

    //     let mathRand = Math.random();
    //     console.log('mathRand ', mathRand);
    //     let rand = Math.floor(mathRand*10);
    //     let compl = false;
    //     // let completed_checked = 'not_checked';
    //     console.log('rand ', rand);
    //     if(rand > 5) {
    //         compl = true;
    //     }

    //     let dt = new Date();
    //     let hours4Millis = 1000*60*60*4;
    //     let hours24Millis = hours4Millis*6;
    //     let hours72Millis = hours24Millis*3;
    //     let oneHourMillis = 1000*60*60;
    //     let oneMinuteMillis = 1000*60;

    //     console.log('dt ', dt);
    //     // console.log('dt.getDate() ', dt.getDate());
    //     // console.log('dt.getTime ', dt.getTime());
    //     // console.log('dt.getMonth() ', dt.getMonth());
    //     // console.log('dt.getFullYear() ', dt.getFullYear());
    //     // console.log('dt.getHour() ', dt.getHours());
    //     // console.log('dt.getMinute() ', dt.getMinutes());

    //     // within 4 hours of start - 3 hours
    //     let endDt = new Date(dt.getTime()+hours24Millis-oneMinuteMillis);

    //     // Actual code to be used
    //     const newData = {
    //         work_name: `Universe003${endDt.getMinutes()}`,
    //         start_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         end_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         actual_start_date: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         delay_reason: `None 003${endDt.getMinutes()}`,
    //         completed: false
    //     };

    //     // // Testing true completed only
    //     // const newData = {
    //     //     work_name: `Universe003${rand}`,
    //     //     start_date_time: `12/13/2023 9:4${rand}`,
    //     //     end_date_time: `12/13/2023 9:4${rand}`,
    //     //     actual_start_date: `12/13/2023 9:4${rand}`,
    //     //     delay_reason: `None 003${rand}`,
    //     //     completed: true
    //     // };
        
    //     console.log('newData ', newData);

    //     if(newData.completed) {
    //         // Completed work addition
    //         browser
    //             .url('http://127.0.0.1:5500')
    //             .pause(20000)
    //             .waitForElementVisible('.add-btn1')
    //             // .pause(5000)
    //             // .click('.work-notif')
    //             // .pause(5000)
    //             // .alerts.dismiss(() => {
    //             //     console.log('Alert dismissed successfully!!!! ');
    //             // })
    //             // .ensure.alertIsPresent()
    //             // .pause(500)
    //             // // .saveScreenshot('tests_output/deleteWork0.png')
    //             // .acceptAlert()
    //             // .pause(1000)
    //             // .ensure.not.alertIsPresent()    
    //             // .waitForElementVisible('.add-btn1')
    //             .click('.add-btn1')
    //             .setValue('#work_name', newData.work_name)
    //             .setValue('#start_date_time', newData.start_date_time)
    //             .setValue('#end_date_time', newData.end_date_time)
    //             .setValue('#actual_start_date', newData.actual_start_date)
    //             .setValue('#delay_reason', newData.delay_reason)
    //             .click('#completed_add_span')
    //             // .saveScreenshot('tests_output/addWork0.png')
    //             // .pause(7000)
    //             // .submitForm('#add-work')  // did not work
    //             // .submitForm(addBtn2)
    //             .pause(500)
    //             .click('#add-btn2[type="submit"]')
    //             // .click('div.all  works');
    //             // .click('.add-btn2')
    //             // .submitForm('.add-work')   // one suggestion to click twice for submit
    //             // .saveScreenshot('tests_output/addWork1.png')
    //             // .pause(20000)
    //             // .end();
    //             .pause(10000)
    //             .ensure.alertIsPresent()
    //             .pause(500)
    //             .acceptAlert()
    //             .ensure.not.alertIsPresent()
    //             // .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
    //             //     let added_work = resp.data;
    //             //     console.log('added_work ', added_work);
    //             //     if(added_work.length > 1) {
    //             //         console.log('Unable to test - duplicate work');
    //             //         return;
    //             //     }
    //             //     console.log('added_work.work_name ', added_work[0].data.work_name);
    //             //     browser
    //             //         .assert.equal(added_work[0].data.work_name, newData.work_name)
    //             //         .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
    //             //         .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
    //             //         .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
    //             //         .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
    //             //         .assert.equal(added_work[0].data.completed, newData.completed)
    //             // })
    //             .pause(1000)    
    //     } else {
    //         // Incomplete work addition
    //         browser
    //             .url('http://127.0.0.1:5500')
    //             .pause(20000)
    //             .waitForElementVisible('.add-btn1')
    //             // .pause(5000)
    //             // .click('.work-notif')
    //             // .pause(5000)
    //             // .waitForElementVisible('.add-btn1')
    //             .click('.add-btn1')
    //             .setValue('#work_name', newData.work_name)
    //             .setValue('#start_date_time', newData.start_date_time)
    //             .setValue('#end_date_time', newData.end_date_time)
    //             .setValue('#actual_start_date', newData.actual_start_date)
    //             .setValue('#delay_reason', newData.delay_reason)
    //             // .saveScreenshot('tests_output/addWork0.png')
    //             // .pause(7000)
    //             // .submitForm('#add-work')  // did not work
    //             // .submitForm(addBtn2)
    //             .pause(500)
    //             .click('#add-btn2[type="submit"]')
    //             // .click('div.all  works');
    //             // .click('.add-btn2')
    //             // .submitForm('.add-work')   // one suggestion to click twice for submit
    //             // .saveScreenshot('tests_output/addWork1.png')
    //             // .pause(20000)
    //             // .end();
    //             .pause(10000)
    //             .ensure.alertIsPresent()
    //             .pause(500)
    //             .acceptAlert()
    //             .ensure.not.alertIsPresent()
    //             // .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
    //             //     let added_work = resp.data;
    //             //     console.log('added_work ', added_work);
    //             //     if(added_work.length > 1) {
    //             //         console.log('Unable to test - duplicate work');
    //             //         return;
    //             //     }
    //             //     console.log('added_work.work_name ', added_work[0].data.work_name);
    //             //     browser
    //             //         .assert.equal(added_work[0].data.work_name, newData.work_name)
    //             //         .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
    //             //         .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
    //             //         .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
    //             //         .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
    //             //         .assert.equal(added_work[0].data.completed, newData.completed)
    //             // })
    //             .pause(1000)
    
    //     }
        
    //     // addBtn2.submitForm()
        
    // },

    // AppNotification24Hours24_01: (browser) => {
    //     const addBtn2 = browser.element.find('.add-btn2[type="submit"]');
    //     const addForm = browser.element.find('.add-work');

    //     let mathRand = Math.random();
    //     console.log('mathRand ', mathRand);
    //     let rand = Math.floor(mathRand*10);
    //     let compl = false;
    //     let completed_checked = 'not_checked';
    //     console.log('rand ', rand);
    //     if(rand > 5) {
    //         compl = true;
    //     }

    //     let dt = new Date();
    //     let hours4Millis = 1000*60*60*4;
    //     let hours24Millis = hours4Millis*6;
    //     let hours72Millis = hours24Millis*3;
    //     let oneHourMillis = 1000*60*60;
    //     let oneMinuteMillis = 1000*60;

    //     console.log('dt ', dt);
    //     console.log('dt.getDate() ', dt.getDate());
    //     console.log('dt.getTime ', dt.getTime());
    //     console.log('dt.getMonth() ', dt.getMonth());
    //     console.log('dt.getFullYear() ', dt.getFullYear());
    //     console.log('dt.getHour() ', dt.getHours());
    //     console.log('dt.getMinute() ', dt.getMinutes());

    //     within 4 hours of start - 3 hours
    //     let endDt = new Date(dt.getTime()+hours24Millis+oneMinuteMillis+oneMinuteMillis);

    //     Actual code to be used
    //     const newData = {
    //         work_name: `Universe003${endDt.getMinutes()}`,
    //         start_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         end_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         actual_start_date: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         delay_reason: `None 003${endDt.getMinutes()}`,
    //         completed: false
    //     };

    //     // Testing true completed only
    //     const newData = {
    //         work_name: `Universe003${rand}`,
    //         start_date_time: `12/13/2023 9:4${rand}`,
    //         end_date_time: `12/13/2023 9:4${rand}`,
    //         actual_start_date: `12/13/2023 9:4${rand}`,
    //         delay_reason: `None 003${rand}`,
    //         completed: true
    //     };
        
    //     console.log('newData ', newData);

    //     if(newData.completed) {
    //         Completed work addition
    //         browser
    //             .url('http://127.0.0.1:5500')
    //             .pause(20000)
    //             .waitForElementVisible('.add-btn1')
    //             .pause(5000)
    //             .click('.work-notif')
    //             .pause(5000)
    //             .alerts.dismiss(() => {
    //                 console.log('Alert dismissed successfully!!!! ');
    //             })
    //             .ensure.alertIsPresent()
    //             .pause(500)
    //             // .saveScreenshot('tests_output/deleteWork0.png')
    //             .acceptAlert()
    //             .pause(1000)
    //             .ensure.not.alertIsPresent()    
    //             .waitForElementVisible('.add-btn1')
    //             .click('.add-btn1')
    //             .setValue('#work_name', newData.work_name)
    //             .setValue('#start_date_time', newData.start_date_time)
    //             .setValue('#end_date_time', newData.end_date_time)
    //             .setValue('#actual_start_date', newData.actual_start_date)
    //             .setValue('#delay_reason', newData.delay_reason)
    //             .click('#completed_add_span')
    //             .saveScreenshot('tests_output/addWork0.png')
    //             .pause(7000)
    //             .submitForm('#add-work')  // did not work
    //             .submitForm(addBtn2)
    //             .pause(500)
    //             .click('#add-btn2[type="submit"]')
    //             .click('div.all  works');
    //             .click('.add-btn2')
    //             .submitForm('.add-work')   // one suggestion to click twice for submit
    //             .saveScreenshot('tests_output/addWork1.png')
    //             .pause(20000)
    //             .end();
    //             .pause(10000)
    //             .ensure.not.alertIsPresent()
    //             .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
    //                 let added_work = resp.data;
    //                 console.log('added_work ', added_work);
    //                 if(added_work.length > 1) {
    //                     console.log('Unable to test - duplicate work');
    //                     return;
    //                 }
    //                 console.log('added_work.work_name ', added_work[0].data.work_name);
    //                 browser
    //                     .assert.equal(added_work[0].data.work_name, newData.work_name)
    //                     .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
    //                     .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
    //                     .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
    //                     .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
    //                     .assert.equal(added_work[0].data.completed, newData.completed)
    //             })
    //             .pause(1000)    
    //     } else {
    //         Incomplete work addition
    //         browser
    //             .url('http://127.0.0.1:5500')
    //             .pause(20000)
    //             .waitForElementVisible('.add-btn1')
    //             .pause(5000)
    //             .click('.work-notif')
    //             .pause(5000)
    //             .waitForElementVisible('.add-btn1')
    //             .click('.add-btn1')
    //             .setValue('#work_name', newData.work_name)
    //             .setValue('#start_date_time', newData.start_date_time)
    //             .setValue('#end_date_time', newData.end_date_time)
    //             .setValue('#actual_start_date', newData.actual_start_date)
    //             .setValue('#delay_reason', newData.delay_reason)
    //             .saveScreenshot('tests_output/addWork0.png')
    //             .pause(7000)
    //             .submitForm('#add-work')  // did not work
    //             .submitForm(addBtn2)
    //             .pause(500)
    //             .click('#add-btn2[type="submit"]')
    //             .click('div.all  works');
    //             .click('.add-btn2')
    //             .submitForm('.add-work')   // one suggestion to click twice for submit
    //             .saveScreenshot('tests_output/addWork1.png')
    //             .pause(20000)
    //             .end();
    //             .pause(10000)
    //             .ensure.not.alertIsPresent()
    //             .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
    //                 let added_work = resp.data;
    //                 console.log('added_work ', added_work);
    //                 if(added_work.length > 1) {
    //                     console.log('Unable to test - duplicate work');
    //                     return;
    //                 }
    //                 console.log('added_work.work_name ', added_work[0].data.work_name);
    //                 browser
    //                     .assert.equal(added_work[0].data.work_name, newData.work_name)
    //                     .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
    //                     .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
    //                     .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
    //                     .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
    //                     .assert.equal(added_work[0].data.completed, newData.completed)
    //             })
    //             .pause(1000)
    
    //     }
        
    //     addBtn2.submitForm()
        
    // },

    // AppNotification24Hours20_01: (browser) => {
    //     const addBtn2 = browser.element.find('.add-btn2[type="submit"]');
    //     const addForm = browser.element.find('.add-work');

    //     let mathRand = Math.random();
    //     console.log('mathRand ', mathRand);
    //     let rand = Math.floor(mathRand*10);
    //     let compl = false;
    //     let completed_checked = 'not_checked';
    //     console.log('rand ', rand);
    //     if(rand > 5) {
    //         compl = true;
    //     }

    //     let dt = new Date();
    //     let hours4Millis = 1000*60*60*4;
    //     let hours24Millis = hours4Millis*6;
    //     let hours72Millis = hours24Millis*3;
    //     let oneHourMillis = 1000*60*60;
    //     let oneMinuteMillis = 1000*60;

    //     console.log('dt ', dt);
    //     console.log('dt.getDate() ', dt.getDate());
    //     console.log('dt.getTime ', dt.getTime());
    //     console.log('dt.getMonth() ', dt.getMonth());
    //     console.log('dt.getFullYear() ', dt.getFullYear());
    //     console.log('dt.getHour() ', dt.getHours());
    //     console.log('dt.getMinute() ', dt.getMinutes());

    //     within 4 hours of start - 3 hours
    //     let endDt = new Date(dt.getTime()+hours24Millis-(4*oneHourMillis)+(2*oneMinuteMillis));

    //     Actual code to be used
    //     const newData = {
    //         work_name: `Universe003${endDt.getMinutes()}`,
    //         start_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         end_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         actual_start_date: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
    //         delay_reason: `None 003${endDt.getMinutes()}`,
    //         completed: false
    //     };

    //     // Testing true completed only
    //     const newData = {
    //         work_name: `Universe003${rand}`,
    //         start_date_time: `12/13/2023 9:4${rand}`,
    //         end_date_time: `12/13/2023 9:4${rand}`,
    //         actual_start_date: `12/13/2023 9:4${rand}`,
    //         delay_reason: `None 003${rand}`,
    //         completed: true
    //     };
        
    //     console.log('newData ', newData);

    //     if(newData.completed) {
    //         Completed work addition
    //         browser
    //             .url('http://127.0.0.1:5500')
    //             .pause(20000)
    //             .waitForElementVisible('.add-btn1')
    //             .pause(5000)
    //             .click('.work-notif')
    //             .pause(5000)
    //             .alerts.dismiss(() => {
    //                 console.log('Alert dismissed successfully!!!! ');
    //             })
    //             .ensure.alertIsPresent()
    //             .pause(500)
    //             // .saveScreenshot('tests_output/deleteWork0.png')
    //             .acceptAlert()
    //             .pause(1000)
    //             .ensure.not.alertIsPresent()    
    //             .waitForElementVisible('.add-btn1')
    //             .click('.add-btn1')
    //             .setValue('#work_name', newData.work_name)
    //             .setValue('#start_date_time', newData.start_date_time)
    //             .setValue('#end_date_time', newData.end_date_time)
    //             .setValue('#actual_start_date', newData.actual_start_date)
    //             .setValue('#delay_reason', newData.delay_reason)
    //             .click('#completed_add_span')
    //             .saveScreenshot('tests_output/addWork0.png')
    //             .pause(7000)
    //             .submitForm('#add-work')  // did not work
    //             .submitForm(addBtn2)
    //             .pause(500)
    //             .click('#add-btn2[type="submit"]')
    //             .click('div.all  works');
    //             .click('.add-btn2')
    //             .submitForm('.add-work')   // one suggestion to click twice for submit
    //             .saveScreenshot('tests_output/addWork1.png')
    //             .pause(20000)
    //             .end();
    //             .pause(10000)
    //             .ensure.alertIsPresent()
    //             .pause(500)
    //             .acceptAlert()
    //             .ensure.not.alertIsPresent()
    //             .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
    //                 let added_work = resp.data;
    //                 console.log('added_work ', added_work);
    //                 if(added_work.length > 1) {
    //                     console.log('Unable to test - duplicate work');
    //                     return;
    //                 }
    //                 console.log('added_work.work_name ', added_work[0].data.work_name);
    //                 browser
    //                     .assert.equal(added_work[0].data.work_name, newData.work_name)
    //                     .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
    //                     .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
    //                     .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
    //                     .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
    //                     .assert.equal(added_work[0].data.completed, newData.completed)
    //             })
    //             .pause(1000)    
    //     } else {
    //         Incomplete work addition
    //         browser
    //             .url('http://127.0.0.1:5500')
    //             .pause(20000)
    //             .waitForElementVisible('.add-btn1')
    //             .pause(5000)
    //             .click('.work-notif')
    //             .pause(5000)
    //             .waitForElementVisible('.add-btn1')
    //             .click('.add-btn1')
    //             .setValue('#work_name', newData.work_name)
    //             .setValue('#start_date_time', newData.start_date_time)
    //             .setValue('#end_date_time', newData.end_date_time)
    //             .setValue('#actual_start_date', newData.actual_start_date)
    //             .setValue('#delay_reason', newData.delay_reason)
    //             .saveScreenshot('tests_output/addWork0.png')
    //             .pause(7000)
    //             .submitForm('#add-work')  // did not work
    //             .submitForm(addBtn2)
    //             .pause(500)
    //             .click('#add-btn2[type="submit"]')
    //             .click('div.all  works');
    //             .click('.add-btn2')
    //             .submitForm('.add-work')   // one suggestion to click twice for submit
    //             .saveScreenshot('tests_output/addWork1.png')
    //             .pause(20000)
    //             .end();
    //             .pause(10000)
    //             .ensure.alertIsPresent()
    //             .pause(500)
    //             .acceptAlert()
    //             .ensure.not.alertIsPresent()
    //             .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
    //                 let added_work = resp.data;
    //                 console.log('added_work ', added_work);
    //                 if(added_work.length > 1) {
    //                     console.log('Unable to test - duplicate work');
    //                     return;
    //                 }
    //                 console.log('added_work.work_name ', added_work[0].data.work_name);
    //                 browser
    //                     .assert.equal(added_work[0].data.work_name, newData.work_name)
    //                     .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
    //                     .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
    //                     .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
    //                     .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
    //                     .assert.equal(added_work[0].data.completed, newData.completed)
    //             })
    //             .pause(1000)
    
    //     }
        
    //     addBtn2.submitForm()
        
    // },

    AppNotification24Hours_19_58: (browser) => {
        // const addBtn2 = browser.element.find('.add-btn2[type="submit"]');
        // const addForm = browser.element.find('.add-work');

        let mathRand = Math.random();
        console.log('mathRand ', mathRand);
        let rand = Math.floor(mathRand*10);
        let compl = false;
        // let completed_checked = 'not_checked';
        console.log('rand ', rand);
        if(rand > 5) {
            compl = true;
        }

        let dt = new Date();
        let hours4Millis = 1000*60*60*4;
        let hours24Millis = hours4Millis*6;
        let hours72Millis = hours24Millis*3;
        let oneHourMillis = 1000*60*60;
        let oneMinuteMillis = 1000*60;

        console.log('dt ', dt);
        // console.log('dt.getDate() ', dt.getDate());
        // console.log('dt.getTime ', dt.getTime());
        // console.log('dt.getMonth() ', dt.getMonth());
        // console.log('dt.getFullYear() ', dt.getFullYear());
        // console.log('dt.getHour() ', dt.getHours());
        // console.log('dt.getMinute() ', dt.getMinutes());

        // within 4 hours of start - 3 hours
        let endDt = new Date(dt.getTime()+hours24Millis-(4*oneHourMillis)-(2*oneMinuteMillis));

        // Actual code to be used
        const newData = {
            work_name: `Universe003${endDt.getMinutes()}`,
            start_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
            end_date_time: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
            actual_start_date: `${endDt.getMonth()+1}/${endDt.getDate()}/${endDt.getFullYear()} ${endDt.getHours()}:${endDt.getMinutes()}`,
            delay_reason: `None 003${endDt.getMinutes()}`,
            completed: false
        };

        // // Testing true completed only
        // const newData = {
        //     work_name: `Universe003${rand}`,
        //     start_date_time: `12/13/2023 9:4${rand}`,
        //     end_date_time: `12/13/2023 9:4${rand}`,
        //     actual_start_date: `12/13/2023 9:4${rand}`,
        //     delay_reason: `None 003${rand}`,
        //     completed: true
        // };
        
        console.log('newData ', newData);

        if(newData.completed) {
            // Completed work addition
            browser
                .url('http://127.0.0.1:5500')
                .pause(20000)
                .waitForElementVisible('.add-btn1')
                // .pause(5000)
                // .click('.work-notif')
                // .pause(5000)
                // .alerts.dismiss(() => {
                //     console.log('Alert dismissed successfully!!!! ');
                // })
                // .ensure.alertIsPresent()
                // .pause(500)
                // // .saveScreenshot('tests_output/deleteWork0.png')
                // .acceptAlert()
                // .pause(1000)
                // .ensure.not.alertIsPresent()    
                // .waitForElementVisible('.add-btn1')
                .click('.add-btn1')
                .setValue('#work_name', newData.work_name)
                .setValue('#start_date_time', newData.start_date_time)
                .setValue('#end_date_time', newData.end_date_time)
                .setValue('#actual_start_date', newData.actual_start_date)
                .setValue('#delay_reason', newData.delay_reason)
                .click('#completed_add_span')
                // .saveScreenshot('tests_output/addWork0.png')
                // .pause(7000)
                // .submitForm('#add-work')  // did not work
                // .submitForm(addBtn2)
                .pause(500)
                .click('#add-btn2[type="submit"]')
                // .click('div.all  works');
                // .click('.add-btn2')
                // .submitForm('.add-work')   // one suggestion to click twice for submit
                // .saveScreenshot('tests_output/addWork1.png')
                // .pause(20000)
                // .end();
                .pause(10000)
                .ensure.not.alertIsPresent()
                // .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
                //     let added_work = resp.data;
                //     console.log('added_work ', added_work);
                //     if(added_work.length > 1) {
                //         console.log('Unable to test - duplicate work');
                //         return;
                //     }
                //     console.log('added_work.work_name ', added_work[0].data.work_name);
                //     browser
                //         .assert.equal(added_work[0].data.work_name, newData.work_name)
                //         .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
                //         .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
                //         .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
                //         .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
                //         .assert.equal(added_work[0].data.completed, newData.completed)
                // })
                .pause(1000)    
        } else {
            // Incomplete work addition
            browser
                .url('http://127.0.0.1:5500')
                .pause(20000)
                .waitForElementVisible('.add-btn1')
                // .pause(5000)
                // .click('.work-notif')
                // .pause(5000)
                // .waitForElementVisible('.add-btn1')
                .click('.add-btn1')
                .setValue('#work_name', newData.work_name)
                .setValue('#start_date_time', newData.start_date_time)
                .setValue('#end_date_time', newData.end_date_time)
                .setValue('#actual_start_date', newData.actual_start_date)
                .setValue('#delay_reason', newData.delay_reason)
                // .saveScreenshot('tests_output/addWork0.png')
                // .pause(7000)
                // .submitForm('#add-work')  // did not work
                // .submitForm(addBtn2)
                .pause(500)
                .click('#add-btn2[type="submit"]')
                // .click('div.all  works');
                // .click('.add-btn2')
                // .submitForm('.add-work')   // one suggestion to click twice for submit
                // .saveScreenshot('tests_output/addWork1.png')
                // .pause(20000)
                // .end();
                .pause(10000)
                .ensure.not.alertIsPresent()
                // .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
                //     let added_work = resp.data;
                //     console.log('added_work ', added_work);
                //     if(added_work.length > 1) {
                //         console.log('Unable to test - duplicate work');
                //         return;
                //     }
                //     console.log('added_work.work_name ', added_work[0].data.work_name);
                //     browser
                //         .assert.equal(added_work[0].data.work_name, newData.work_name)
                //         .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
                //         .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
                //         .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
                //         .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
                //         .assert.equal(added_work[0].data.completed, newData.completed)
                // })
                .pause(1000)
    
        }
        
        // addBtn2.submitForm()
        
    },

    CheckLogs: (client) => {
        client
            .getLog('browser', (logEntryArray) => {
                console.log('log length ', logEntryArray.length);
                logEntryArray.forEach(log => {
                    console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
                })
            })
            // .end();
    }


};