const express = require('express');
const router = express.Router();

const API = require('../../api/ClientAPI');

router.get('/', API.getClients);
router.get('/:id', API.getClientById);
router.post('/', API.createClient);
router.put('/:id', API.updateClient);
router.delete('/:id', API.deleteClient);

module.exports = router;