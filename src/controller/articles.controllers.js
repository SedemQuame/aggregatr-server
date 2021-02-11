const articles = require(`./../models/articles.models`);

exports.all = (req, res) => {
    articles.find({}).then((docs) => {
        console.log(docs)
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
    articles.find({category: req.params.category_name}).then(docs => {
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
    articles.find({title: req.params.search_term}).then(docs => {
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