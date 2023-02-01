const BookRepository = require('../repository/sequelize/BookRepository');
const AuthorRepository = require('../repository/sequelize/AuthorRepository');
exports.showBookList = (req, res, next) =>{
    BookRepository.getBooks().then(books =>{
        res.render('pages/books/books', {
            books: books,
            navLocation: 'books'});
    });
}

exports.showBookForm = (req, res, next) =>{
    let allAuth;
    AuthorRepository.getAuthors()
        .then(auths => {
            allAuth = auths;
            res.render('pages/books/books-form', {
                bk: {},
                allAuth: allAuth,
                pageTitle: 'New book',
                btnLabel: 'Add book',
                formMode: 'createNew',
                formAction: '/books/add',
                navLocation: 'books',
                errors: []
            });
        });

}
exports.showBookEdit = (req, res, next) =>{
    const bookId = req.params.IdBook;
    let allAuth;
    AuthorRepository.getAuthors()
        .then(auths =>{
            allAuth = auths;
            return  BookRepository.getBookById(bookId);
        })
        .then(bk =>{
            res.render('pages/books/books-form', {
                bk: bk,
                allAuth: allAuth,
                formMode: 'edit',
                pageTitle: 'Edit book',
                btnLabel: 'Edit book',
                formAction: '/books/edit',
                navLocation: 'books',
                errors: []
            });
        });
}

exports.showBookDetails = (req, res, next) =>{
    const bookId = req.params.IdBook;
    let allAuth;
    AuthorRepository.getAuthors()
        .then(auths => {
            allAuth = auths;
            return BookRepository.getBookById(bookId);
        })
        .then(bk =>{
            res.render('pages/books/books-form', {
                bk: bk,
                allAuth: allAuth,
                formMode: 'showDetails',
                pageTitle: 'Book details',
                formAction: '',
                navLocation: 'books',
                errors: []
            });
        });
}

exports.addBook = (req, res, next) => {
    const bookDate = {...req.body};
    let allAuth;
    AuthorRepository.getAuthors()
        .then(auths => {
            allAuth = auths;
            BookRepository.createBook(bookDate)
                .then(result => {
                res.redirect('/books');
                })
                .catch(err => {
                    res.render('pages/books/books-form', {
                        bk: bookDate,
                        allAuth: allAuth,
                        pageTitle: 'New book',
                        btnLabel: 'Add book',
                        formMode: 'createNew',
                        formAction: '/books/add',
                        navLocation: 'books',
                        errors: err.errors
                    })
                });
        });
}

exports.updateBook = (req, res, next) => {
    const bookId = req.body._id;
    const bookData = {...req.body};
    let allAuth;
    AuthorRepository.getAuthors()
        .then(auths => {
            allAuth = auths;
            BookRepository.updateBook(bookId, bookData).then( result => res.redirect('/books'))
            .catch(err => {
            res.render('pages/books/books-form', {
                bk: bookData,
                allAuth: allAuth,
                pageTitle: 'Edit book',
                btnLabel: 'Edit book',
                formMode: 'createNew',
                formAction: '/books/edit',
                navLocation: 'books',
                errors: err.errors
            })
        });
    });
}

exports.deleteBook = (req, res, next) => {
    const bookId = req.params.IdBook;
    BookRepository.deleteBook(bookId)
        .then( () => {
            res.redirect('/books')
        })
}





