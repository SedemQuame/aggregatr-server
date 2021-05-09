// ================================ creating application routes ===================================//
module.exports = app => {
    const articles = require(`./../controller/articles.controllers`);

    app.route(`/headlines`)
        .get(articles.headlines);

    app.route(`/all`)
        .get(articles.all);

    app.route(`/category/:category`)
        .get(articles.get_category);

    app.route(`/search/:term`)
        .get(articles.search);

    app.route(`/article/:_id`)
        .get(articles.get_article);

    app.route(`/popular`)
        .get(articles.popular);
};