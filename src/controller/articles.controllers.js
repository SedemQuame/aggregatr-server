const articles = require(`./../models/articles.models`);

exports.headlines = (req, res) => {
    let pagination_page = parseInt(req.query.page) || 0;
    let pagination_limit = parseInt(req.query.limit) || 12;

    articles.paginate({}, { offset: (pagination_limit * pagination_page), limit: pagination_limit}).then(headlines => {
        res.status(200).send({
            headlines
        });
    }).catch(err => {
        res.status(400).send({
            err,
            headlines: []
        });
    })
};

exports.all = (req, res) => {
    let pagination_page = parseInt(req.query.page) || 0;
    let pagination_limit = parseInt(req.query.limit) || 200;

    let date = new Date();
    let monthOption = { month: 'long' };
    let allStories = new Intl.DateTimeFormat('en-US', monthOption).format(date);

    articles.paginate({
        // storyDate: {
        //     '$regex': allStories,
        //     '$options': 'i'
        // }
    }, { offset: (pagination_limit * pagination_page), limit: pagination_limit }).then((articleDocs) => {
        articles.findRandom({
            storyDate: {
                '$regex': new RegExp(`^.*?\\b${allStories}\\b.*?\\b${date.getFullYear()}\\b.*?$`),
                '$options': 'i'
            }
        }, {}, { limit: 10 }, (err, featured) => {
            res.status(200).send({
                featured,
                articles: articleDocs,
                err: null,
                msg: null,
            });
        });
    }).catch(err => {
        console.log(err)
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
    articles.paginate({ category: req.params.category }, {
        offset: (pagination_page * pagination_limit),
        limit: pagination_limit
    }).then((docs) => {
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
    articles.find({ title: { '$regex': req.params.term, '$options': 'i' } }).then(docs => {
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