const express = require('express');
const router = express.Router();

const API = require('../../api/BookAPI');

router.get('/', API.getBooks);
router.get('/:id', API.getBookById);
router.post('/', API.createBook);
router.put('/:id', API.updateBook);
router.delete('/:id', API.deleteBook);

module.exports = router;