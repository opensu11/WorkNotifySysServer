const { alertcenter_v1beta1 } = require("googleapis");

module.exports = {

    AppAddWorkPageTest: (browser) => {
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


        // Actual code to be used
        const newData = {
            work_name: `Universe003${rand}`,
            start_date_time: `12/13/2023 9:4${rand}`,
            end_date_time: `12/13/2023 9:4${rand}`,
            actual_start_date: `12/13/2023 9:4${rand}`,
            delay_reason: `None 003${rand}`,
            completed: compl
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
                .pause(5000)
                .waitForElementVisible('.add-btn1')
                // .pause(5000)
                // .click('.work-notif')
                // .pause(5000)
                .alerts.dismiss(() => {
                    console.log('Alert dismissed successfully!!!! ');
                })
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
                .pause(2000)
                .click('#add-btn2[type="submit"]')
                // .click('div.all  works');
                // .click('.add-btn2')
                // .submitForm('.add-work')   // one suggestion to click twice for submit
                // .saveScreenshot('tests_output/addWork1.png')
                // .pause(20000)
                // .end();
                .pause(8000)
                .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
                    let added_work = resp.data;
                    console.log('added_work ', added_work);
                    if(added_work.length > 1) {
                        console.log('Unable to test - duplicate work');
                        return;
                    }
                    console.log('added_work.work_name ', added_work[0].data.work_name);
                    browser
                        .assert.equal(added_work[0].data.work_name, newData.work_name)
                        .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
                        .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
                        .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
                        .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
                        .assert.equal(added_work[0].data.completed, newData.completed)
                })
                .pause(1000)    
        } else {
            // Incomplete work addition
            browser
                .url('http://127.0.0.1:5500')
                .pause(5000)
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
                .pause(2000)
                .click('#add-btn2[type="submit"]')
                // .click('div.all  works');
                // .click('.add-btn2')
                // .submitForm('.add-work')   // one suggestion to click twice for submit
                // .saveScreenshot('tests_output/addWork1.png')
                // .pause(20000)
                // .end();
                .pause(8000)
                .apiGetWorkByName(newData.work_name, newData.completed, (resp) => {
                    let added_work = resp.data;
                    console.log('added_work ', added_work);
                    if(added_work.length > 1) {
                        console.log('Unable to test - duplicate work');
                        return;
                    }
                    console.log('added_work.work_name ', added_work[0].data.work_name);
                    browser
                        .assert.equal(added_work[0].data.work_name, newData.work_name)
                        .assert.equal(added_work[0].data.start_date_time, newData.start_date_time)
                        .assert.equal(added_work[0].data.end_date_time, newData.end_date_time)
                        .assert.equal(added_work[0].data.actual_start_date, newData.actual_start_date)
                        .assert.equal(added_work[0].data.delay_reason, newData.delay_reason)
                        .assert.equal(added_work[0].data.completed, newData.completed)
                })
                .pause(1000)
    
        }
        
        addBtn2.submitForm()
        
    },

    // AppModifyWorkPageTest: (browser) => {
    //     const hardcodedId = '7ljh8Nth5UgcG5AkZ2nS';
    //     const modifyWorkItem = `p[data-id="${hardcodedId}"]`;

    //     browser
    //         // .url('http://127.0.0.1:5500')
    //         // .pause(1000)
    //         .click('a.work-notif')
    //         .pause(12000)
    //         // Add a record for modification
    //         .click(modifyWorkItem)
    //         .pause(1000)
    //         .setValue('#work_name_modify', 'Universe 0001')
    //         .setValue('#start_date_time_modify', '12/03/2023 5:23')
    //         .setValue('#end_date_time_modify', '12/03/2023 5:23')
    //         .setValue('#actual_start_date_modify', '12/03/2023 5:23')
    //         .setValue('#delay_reason_modify', 'None 0001')
    //         .click('#modify-btn1[type="submit"]')
    //         // .saveScreenshot('tests_output/modifyWork0.png')
    //         .pause(8000)
    //         // .click('div[.allworks]')
    // },

    // AppModifyWorkPageTest2: (browser) => {

        // continue new code for querying id from database
        // and then use it to modify and then
        // verify if it is fine after modifiction in database

        // var allWorks, work;
        // var modifyWorkItem;

        // let rand = Math.floor(Math.random()*10);
        // const updatedData = {
        //     work_name: `Universe003${rand}`,
        //     start_date_time: `12/13/2023 9:4${rand}`,
        //     end_date_time: `12/13/2023 9:4${rand}`,
        //     actual_start_date: `12/13/2023 9:4${rand}`,
        //     delay_reason: `None 003${rand}`
        // };

        // console.log('in AppModifyWorkPageTest2');

        // browser
        //     .pause(3000)
        //     .assert.equal(3, 3.0)
        //     .debug()
        //     .apiGetAllWorks((resp) => {
        //         console.log('resp.data in AppModifyWorkPageTest2 ', resp.data);
        //         allWorks = resp.data;
        //         let select_id_no = Math.floor(Math.random()*allWorks.size);
                
        //         console.log('select_id ', select_id_no);
        //         let i = 0;
        //         allWorks.forEach(currentWork => {
        //             console.log('work ', work);
        //             i++;
        //             if(i === select_id_no) {
        //                 work = currentWork;
        //             }
        //         })
        //         console.log('`p[data-id="${work.id}"]`', `p[data-id="${work.id}"]`);
        //         modifyWorkItem = `p[data-id="${work.id}"]`;
        //     })

        //     .pause(3000)
            // .click('a.work-notif')
            // .pause(10000)

            // // Add a record for modification
            // .click(modifyWorkItem)
            // .pause(1000)
            // .setValue('#work_name_modify', updatedData.work_name)
            // .setValue('#start_date_time_modify', updatedData.start_date_time)
            // .setValue('#end_date_time_modify', updatedData.end_date_time)
            // .setValue('#actual_start_date_modify', updatedData.actual_start_date)
            // .setValue('#delay_reason_modify', updatedData.delay_reason)
            // .click('#modify-btn1[type="submit"]')
            // // .saveScreenshot('tests_output/modifyWork0.png')
            // .pause(8000)
            // .click('div[.allworks]')
            // // getting a work based on id
            // .apiGetWork(work.id, (resp) => {
            //     console.log('resp.data for a single work in AppModifyWorkPageTest2 ', resp.data);
            //     browser.assert.equal(resp.data.work_name, updatedData.work_name)
            //     browser.assert.equal(resp.data.start_date_time, updatedData.start_date_time)
            //     browser.assert.equal(resp.data.end_date_time, updatedData.end_date_time)
            //     browser.assert.equal(resp.data.actual_start_date, updatedData.actual_start_date)
            //     browser.assert.equal(resp.data.delay_reason, updatedData.delay_reason)
            // })

            // .pause(3000);
    // },

    AppModifyWorkPageTest3: (browser) => {
        let selected_work;
        var modifyWorkItem;
        
        // continue new code for querying id from database
        // and then use it to modify and then
        // verify if it is fine after modifiction in database

        // var allWorks, work;
        // var modifyWorkItem;

        let rand = Math.floor(Math.random()*10);
        let compl = false;
        // let completed_checked = 'not_checked';
        console.log('rand ', rand);
        if(rand > 5) {
            compl = true;
        }

        // Actual code to be used
        const updatedData = {
            work_name: `Universe003${rand}`,
            start_date_time: `12/13/2023 9:4${rand}`,
            end_date_time: `12/13/2023 9:4${rand}`,
            actual_start_date: `12/13/2023 9:4${rand}`,
            delay_reason: `None 003${rand}`,
            completed: compl
        };

        // // Only for testing ; setting completed to true as most of the records have completed as false
        // const updatedData = {
        //     work_name: `Universe003${rand}`,
        //     start_date_time: `12/13/2023 9:4${rand}`,
        //     end_date_time: `12/13/2023 9:4${rand}`,
        //     actual_start_date: `12/13/2023 9:4${rand}`,
        //     delay_reason: `None 003${rand}`,
        //     completed: true
        // };

        console.log('updatedData ', updatedData);

        browser
            .pause(3000)
            .apiGetAllWorks((resp) => {
                console.log('resp.data in AppModifyWorkPageTest3 ', resp.data);

                



                
                // Code block - to be used

                let allWorks = resp.data;
                var incompleteWorks = [];

                allWorks.forEach(currentWork => {
                    console.log('currentWork ', currentWork);
                    if(!currentWork.data.completed) {
                        incompleteWorks.push(currentWork);
                    }
                });

                let select_id_no = Math.floor(Math.random()*incompleteWorks.length);
                console.log('select_id_no ', select_id_no);
                let i = 0;

                incompleteWorks.forEach(incompleteWork => {
                    i++;
                    if(i === select_id_no) {
                        selected_work = incompleteWork;
                    }
                })

                console.log('selected_work ', selected_work);

                modifyWorkItem = `p[data-id="${selected_work.id}"]`;
                // Code block - to be used

                // // 1st version - working
                // browser
                // .pause(500)
                // .click(modifyWorkItem)
                // .pause(1000)
                // .setValue('#work_name_modify', updatedData.work_name)
                // .setValue('#start_date_time_modify', updatedData.start_date_time)
                // .setValue('#end_date_time_modify', updatedData.end_date_time)
                // .setValue('#actual_start_date_modify', updatedData.actual_start_date)
                // .setValue('#delay_reason_modify', updatedData.delay_reason)
                // .click('#modify-btn1[type="submit"]')
                // // .saveScreenshot('tests_output/modifyWork0.png')
                // .pause(8000)
                // .apiGetWork(selected_work.id, (resp) => {
                //     let modified_work = resp.data;
                //     console.log('modified_work ', modified_work);
                //     console.log('modified_work.data.completed ', modified_work.data.completed);
                //     console.log('updatedData.completed ', updatedData.completed);
                //     // console.log('modified_work.data.completed == updatedData.completed ', (modified_work.data.completed == updatedData.completed));

                //     browser
                //         .assert.equal(modified_work.data.work_name, updatedData.work_name)
                //         .assert.equal(modified_work.data.start_date_time, updatedData.start_date_time)
                //         .assert.equal(modified_work.data.end_date_time, updatedData.end_date_time)
                //         .assert.equal(modified_work.data.actual_start_date, updatedData.actual_start_date)
                //         .assert.equal(modified_work.data.delay_reason, updatedData.delay_reason)
                //         .assert.equal(modified_work.data.completed, updatedData.completed);

                // })
                // .pause(5000)


                // 2nd version

                console.log('selected_work.data.completed == updatedData.completed ', (selected_work.data.completed===updatedData.completed));
                // console.log('modifyWorkItem ', modifyWorkItem);
                console.log(modifyWorkItem);
                if(selected_work.data.completed === updatedData.completed) {
                    browser
                    .pause(1000)
                    .click(modifyWorkItem)
                    .pause(1000)
                    .setValue('#work_name_modify', updatedData.work_name)
                    .setValue('#start_date_time_modify', updatedData.start_date_time)
                    .setValue('#end_date_time_modify', updatedData.end_date_time)
                    .setValue('#actual_start_date_modify', updatedData.actual_start_date)
                    .setValue('#delay_reason_modify', updatedData.delay_reason)
                    .click('#modify-btn1[type="submit"]')
                    // .saveScreenshot('tests_output/modifyWork0.png')
                    .pause(7000)
                    .apiGetWork(selected_work.id, (resp) => {
                        let modified_work = resp.data;
                        console.log('modified_work ', modified_work);
                        console.log('modified_work.data.work_name ', modified_work.data.work_name);
                        browser
                            .assert.equal(modified_work.data.work_name, updatedData.work_name)
                            .assert.equal(modified_work.data.start_date_time, updatedData.start_date_time)
                            .assert.equal(modified_work.data.end_date_time, updatedData.end_date_time)
                            .assert.equal(modified_work.data.actual_start_date, updatedData.actual_start_date)
                            .assert.equal(modified_work.data.delay_reason, updatedData.delay_reason)
                            .assert.equal(modified_work.data.completed, updatedData.completed)
                    })
                } else {
                    browser
                    .pause(1000)
                    .click(modifyWorkItem)
                    .pause(1000)
                    .setValue('#work_name_modify', updatedData.work_name)
                    .setValue('#start_date_time_modify', updatedData.start_date_time)
                    .setValue('#end_date_time_modify', updatedData.end_date_time)
                    .setValue('#actual_start_date_modify', updatedData.actual_start_date)
                    .setValue('#delay_reason_modify', updatedData.delay_reason)
                    // .click('#completed_modify')
                    .click('#completed_modify_span')
                    .pause(1000)
                    .click('#modify-btn1[type="submit"]')
                    // .saveScreenshot('tests_output/modifyWork0.png')
                    .pause(7000)
                    .apiGetWork(selected_work.id, (resp) => {
                        let modified_work = resp.data;
                        console.log('modified_work ', modified_work);
                        console.log('modified_work.data.work_name ', modified_work.data.work_name);
                        browser
                            .assert.equal(modified_work.data.work_name, updatedData.work_name)
                            .assert.equal(modified_work.data.start_date_time, updatedData.start_date_time)
                            .assert.equal(modified_work.data.end_date_time, updatedData.end_date_time)
                            .assert.equal(modified_work.data.actual_start_date, updatedData.actual_start_date)
                            .assert.equal(modified_work.data.delay_reason, updatedData.delay_reason)
                            .assert.equal(modified_work.data.completed, updatedData.completed)
                    })
                }

            })

    },

    // AppDeleteWorkPageTest: (browser) => {
    //     const hardcodedId = '0JyNKzi0cHCV3hu047YC';
    //     const deleteWorkItem = `i[data-id="${hardcodedId}"]`;

    //     browser
    //         // .url('http://127.0.0.1:5500')
    //         // .pause(1000)
    //         .pause(8000)
    //         .click(deleteWorkItem)
    //         .pause(5000)
    //         .ensure.alertIsPresent()
    //         .pause(500)
    //         // .saveScreenshot('tests_output/deleteWork0.png')
    //         .acceptAlert()
    //         .pause(1000)
    //         .ensure.not.alertIsPresent()
    //         // .saveScreenshot('tests_output/deleteWork1.png')
    //         .pause(3000);
    // },

    AppDeleteWorkPageTest2: (browser) => {
        let selected_work_id;
        
        browser
            .pause(3000)
            .apiGetAllWorks((resp) => {
                console.log('resp.data in AppModifyWorkPageTest3 ', resp.data);

                let allWorks = resp.data;
                var incompleteWorks = [];

                allWorks.forEach(currentWork => {
                    console.log('currentWork ', currentWork);
                    if(!currentWork.data.completed) {
                        incompleteWorks.push(currentWork);
                    }
                });

                let select_id_no = Math.floor(Math.random()*incompleteWorks.length);
                console.log('select_id_no ', select_id_no);
                let i = 0;

                incompleteWorks.forEach(incompleteWork => {
                    i++;
                    if(i === select_id_no) {
                        selected_work_id = incompleteWork.id;
                    }
                })



                console.log('selected_work_id ', selected_work_id);

                // 1st version - working
                const deleteWorkItem = `i[data-id="${selected_work_id}"]`;
                browser
                    // .url('http://127.0.0.1:5500')
                    // .pause(1000)
                    .pause(3000)
                    .click(deleteWorkItem)
                    .pause(1000)
                    .ensure.alertIsPresent()
                    .pause(500)
                    // .saveScreenshot('tests_output/deleteWork0.png')
                    .acceptAlert()
                    .pause(1000)
                    .ensure.not.alertIsPresent()
                    // .saveScreenshot('tests_output/deleteWork1.png')
                    .pause(3000)
                    .apiGetWork(selected_work_id, (resp) => {
                        let deleted_work = resp.data;
                        console.log('deleted_work ', deleted_work);
                        console.log('deleted_work.id ', deleted_work.id);
                        console.log('deleted_work.data ', deleted_work.data);
                        browser
                            .assert.equal(deleted_work.data, undefined)
                    })
                    .pause(5000)


            })

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