const Author = require("../../model/sequelize/Author");
const Book = require("../../model/sequelize/Book");

exports.getAuthors = () => {
    return Author.findAll();
};

exports.getAuthorById = (authorId) => {
    return Author.findByPk(authorId, {
        include: [{
            model: Book,
            as: 'book',
        }]
    });
};

exports.createAuthor = (newAuthData) => {
    return Author.create({
        name: newAuthData.name,
        nickname: newAuthData.nickname,
        surname: newAuthData.surname,
        image_link: newAuthData.image_link
    });
};

exports.updateAuthor = (authorId, authData) => {
    const name = authData.name;
    const surname = authData.surname;
    const nickname = authData.nickname;
    return Author.update(authData, {where: {_id: authorId}});
};

exports.deleteAuthor = (authorId) => {
    return Author.destroy({
        where: {_id: authorId}
    });
};