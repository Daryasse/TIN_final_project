const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
router.get('/', bookController.showBookList);
router.get('/add', bookController.showBookForm);
router.get('/edit/:IdBook', bookController.showBookEdit);
router.get('/details/:IdBook', bookController.showBookDetails);
router.post('/add', bookController.addBook);
router.post('/edit', bookController.updateBook);
router.get('/delete/:IdBook', bookController.deleteBook);
module.exports = router;