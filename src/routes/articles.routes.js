// ================================ creating application routes ===================================//
module.exports = app => {
    const articles = require(`./../controller/articles.controllers`);

    app.route(`/getAll`)
        .get(articles.all);

    app.route(`/get/category/:category`)
        .get(articles.get_category);

    app.route(`/search/:term`)
        .get(articles.search);
};