const articles = require(`./../models/articles.models`);

exports.all = (req, res) => {
    let pagination_page = parseInt(req.query.page) || 0;
    let pagination_limit = parseInt(req.query.limit) || 20;

    articles.paginate({}, {offset: (pagination_limit * pagination_page), limit: pagination_limit}).then((docs) => {
        res.status(200).send({
            articles: docs,
            err: null,
            msg: null,
        });
    }).catch(err => {
        res.status(404).send({
            articles: null,
            err,
            msg: `Could not fetch all articles.`,
        });
    });
};

exports.get_category = (req, res) => {
    let pagination_page = req.query.page || 0;
    let pagination_limit = req.query.limit || 20;
    articles.paginate({category: req.params.category}, {
        offset: (pagination_page * 1),
        limit: pagination_limit
    }).then((docs) => {
        // articles.find().then(docs => {
        res.status(200).send({
            articles: docs,
            err: null,
            msg: null,
        });
    }).catch(err => {
        res.status(404).send({
            articles: null,
            err,
            msg: `Could not fetch all articles.`,
        });
    });
};

exports.search = (req, res) => {
    let pagination_page = req.query.page || 0;
    let pagination_limit = req.query.limit || 20;
    articles.paginate({title: req.params.term}, {
        offset: (pagination_page * 1),
        limit: pagination_limit
    }).then((docs) => {
        // articles.find({title: req.params.term}).then(docs => {
        res.status(200).send({
            articles: docs,
            err: null,
            msg: null,
        });
    }).catch(err => {
        res.status(404).send({
            articles: null,
            err,
            msg: `Could not fetch all articles.`,
        });
    });
};