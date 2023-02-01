const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorController');
router.get('/', authorController.showAuthorList);
router.get('/add', authorController.showAuthorForm);
router.get('/edit/:IdAuthor', authorController.showAuthorEdit);
router.get('/details/:IdAuthor', authorController.showAuthorDetails);
router.post('/add', authorController.addAuthor);
router.post('/edit', authorController.updateAuthor);
router.get('/delete/:IdAuthor', authorController.deleteAuthor);
module.exports = router;