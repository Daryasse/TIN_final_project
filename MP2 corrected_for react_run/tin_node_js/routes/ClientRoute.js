const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
router.get('/', clientController.showClientList);
router.get('/add', clientController.showClientForm);
router.get('/details/:IdClient', clientController.showClientDetails);
router.get('/edit/:IdClient', clientController.showClientEdit);
router.post('/add', clientController.addClient);
router.post('/edit', clientController.updateClient);
router.get('/delete/:IdClient', clientController.deleteClient);
module.exports = router