module.exports = {
    addWorkCompleted: (browser, newData) => {
        // Completed work addition
        browser
            .url('http://127.0.0.1:5500')
            .pause(20000)
            .waitForElementVisible('.add-btn1')
            .pause(5000)
            .click('.work-notif')
            .pause(5000)
            .alerts.dismiss(() => {
                console.log('Alert dismissed successfully!!!! ');
            })
            .ensure.alertIsPresent()
            .pause(500)
            // .saveScreenshot('tests_output/deleteWork0.png')
            .acceptAlert()
            .pause(1000)
            .ensure.not.alertIsPresent()    
            .waitForElementVisible('.add-btn1')
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
            // .click('div.all  works')
            // .click('.add-btn2')
            // .submitForm('.add-work')   // one suggestion to click twice for submit
            // .saveScreenshot('tests_output/addWork1.png')
            // .pause(20000)
            // .end();
            .pause(2000)
    },
    
    addWorkNotCompleted: (browser, newData) => {
        // Incomplete work addition
        browser
            .url('http://127.0.0.1:5500')
            .pause(20000)
            .waitForElementVisible('.add-btn1')
            .pause(5000)
            .click('.work-notif')
            .pause(5000)
            .waitForElementVisible('.add-btn1')
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
            .pause(2000)
    },
    
    alertIsPresent: (browser) => {
        browser
        .pause(5000)
        .ensure.alertIsPresent()
        .pause(500)
        .acceptAlert()
        .ensure.not.alertIsPresent()
    },
    
    alertIsNotPresent: (browser) => {
        browser
        .pause(5000)
        .ensure.not.alertIsPresent()
    }
}

