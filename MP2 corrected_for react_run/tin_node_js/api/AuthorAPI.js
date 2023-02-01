const repository = require('../repository/sequelize/AuthorRepository');

exports.getAuthors = (req, res, next) => {
    repository.getAuthors()
        .then(auths => {
            res.status(200).json(auths);
        }).catch(err => {
        console.log(err);
    });
};

exports.getAuthorById = (req, res, next) => {
    const id = req.params.id;
    repository.getAuthorById(id)
        .then(auths => {
            if (!auths) {
                res.status(404).json({
                    message: `Author with id: '+id+' is not found!`
                });
            } else {
                res.status(200).json(auths);
            }
        });
};

exports.createAuthor = (req, res, next) => {
    repository.createAuthor(req.body)
        .then(auths => {
            res.status(201).json(auths);
        }).catch(err => sendError(err, next));
};

exports.updateAuthor = (req, res, next) => {
    const id = req.params.id;
    repository.updateAuthor(id, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Author is updated!',
                author: result
            });
        }).catch(err => sendError(err, next));
};

exports.deleteAuthor = (req, res, next) => {
    const id = req.params.id;
    repository.deleteAuthor(id)
        .then(result => {
            res.status(200).json({
                message: 'Removed author!',
                author: result
            });
        }).catch(err => sendError(err, next));
};

async function sendError(err, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}