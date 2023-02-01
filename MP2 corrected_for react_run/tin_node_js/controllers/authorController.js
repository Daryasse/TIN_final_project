const AuthorRepository = require('../repository/sequelize/AuthorRepository');

exports.showAuthorList = (req, res, next) =>{
    AuthorRepository.getAuthors().then(auths =>{
        res.render('pages/authors/authors', {
            auths: auths,
            navLocation: 'authors'});
    });

}
exports.showAuthorForm = (req, res, next) =>{
    res.render('pages/authors/authors-form', {
        auth: {},
        pageTitle: 'New author',
        btnLabel: 'Add author',
        formMode: 'createNew',
        formAction: '/authors/add',
        navLocation: 'authors',
        errors: []
    });
}

exports.showAuthorEdit = (req, res, next) =>{
    const authId = req.params.IdAuthor;
    AuthorRepository.getAuthorById(authId)
        .then( auth =>{
            res.render('pages/authors/authors-form', {
                auth: auth,
                formMode: 'edit',
                pageTitle: 'Edit author',
                btnLabel: 'Edit author',
                formAction: '/authors/edit',
                navLocation: 'authors',
                errors: []
            });
        });
}

exports.showAuthorDetails = (req, res, next) =>{
    const authId = req.params.IdAuthor;
    AuthorRepository.getAuthorById(authId)
        .then( auth =>{
        res.render('pages/authors/authors-form', {
            auth: auth,
            formMode: 'showDetails',
            pageTitle: 'Author details',
            formAction: '',
            navLocation: 'authors',
            errors: []
        });
    });
}

exports.addAuthor = (req, res, next) => {
    const authDate = { ...req.body};
    AuthorRepository.createAuthor(authDate)
        .then (result => {
            res.redirect('/authors');
        })
        .catch(err => {
            res.render('pages/authors/authors-form', {
                auth: authDate,
                pageTitle: 'New author',
                btnLabel: 'Add author',
                formMode: 'createNew',
                formAction: '/authors/add',
                navLocation: 'authors',
                errors: err.errors
            });
        });
};

exports.updateAuthor = (req, res, next) => {
    const authId = req.body._id;
    const authData = {...req.body};
    AuthorRepository.updateAuthor(authId, authData)
        .then ( result => {
            res.redirect('/authors');
        })
        .catch(err =>{
            res.render('pages/authors/authors-form', {
                auth: authData,
                formMode: 'createNew',
                pageTitle: 'Edit author',
                btnLabel: 'Edit author',
                formAction: '/authors/edit',
                navLocation: 'authors',
                errors: err.errors
            });
        });
};

exports.deleteAuthor = (req, res, next) => {
    const authId = req.params.IdAuthor;
    AuthorRepository.deleteAuthor(authId)
        .then( () => {
            res.redirect('/authors')
        })

};

