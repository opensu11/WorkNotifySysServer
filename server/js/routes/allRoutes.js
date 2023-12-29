const express = require('express');

const {
    createDevice,
    deleteDevice,
    getAllWorks,
    getAWork,
    getWorkByName,
    createTempDocumentInTemp
} = require('../controllers/deviceController.js');

const {
    generateServerKeyToken
} = require('../controllers/serverKeyController.js');

const router = express.Router();

router.get('/generate-server-token', generateServerKeyToken);
router.post('/add-device', createDevice);
router.delete('/delete-device', deleteDevice);
router.delete('/add-temp', createTempDocumentInTemp);
router.get('/all-works', getAllWorks);
router.get('/work', getAWork);
router.get('/work-by-name', getWorkByName);

module.exports = router;