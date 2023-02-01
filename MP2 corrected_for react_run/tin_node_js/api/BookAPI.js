const repository = require('../repository/sequelize/BookRepository');

exports.getBooks = (req, res, next) => {
    repository.getBooks()
        .then(books => {
            res.status(200).json(books);
        }).catch(err => {
        console.log(err);
    });
};

exports.getBookById = (req, res, next) => {
    const id = req.params.id;
    repository.getBookById(id)
        .then(books => {
            if (!books) {
                res.status(404).json({
                    message: `Book with id: '+id+' is not found!`
                });
            } else {
                res.status(200).json(books);
            }
        });
};

exports.createBook = (req, res, next) => {
    repository.createBook(req.body)
        .then(books => res.status(201).json(books))
        .catch(err => sendError(err, next));
};

exports.updateBook = (req, res, next) => {
    const id = req.params.id;
    repository.updateBook(id, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Book is updated!',
                book: result
            });
        }).catch(err => sendError(err, next));
};

exports.deleteBook = (req, res, next) => {
    const id = req.params.id;
    repository.deleteBook(id)
        .then(result => {
            res.status(200).json({
                message: 'Removed book!',
                book: result
            });
        }).catch(err => sendError(err, next));
};

async function sendError(err, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
        console.log(err.message);
    }
    next(err);
}