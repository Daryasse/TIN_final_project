const express = require('express');
const router = express.Router();

const API = require('../../api/AuthorAPI');

router.get('/', API.getAuthors);
router.get('/:id', API.getAuthorById);
router.post('/', API.createAuthor);
router.put('/:id', API.updateAuthor);
router.delete('/:id', API.deleteAuthor);

module.exports = router;