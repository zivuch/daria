const {Router} = require ('express');
const bookController = require('../controllers/bookController.js');

const router = Router();

router.post('/allbooks', bookController.getAllBooks);
router.get('/allbooks/:status', bookController.getAllBooks);
router.get('/book/:id', bookController.getBookById);
router.post('/books/search', bookController.searchBooks);

module.exports = router;
