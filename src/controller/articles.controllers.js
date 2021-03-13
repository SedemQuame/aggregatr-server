const articles = require(`./../models/articles.models`);

exports.all = (req, res) => {
    let pagination_page = parseInt(req.query.page) || 0;
    let pagination_limit = parseInt(req.query.limit) || 200;


    let monthOption = {month: 'long'};
    let allStories = new Intl.DateTimeFormat('en-US', monthOption).format(new Date());

    let dateOption = {day: 'numeric',year: 'numeric', month: 'long'};
    let featuredStories = new Intl.DateTimeFormat(['ban', 'en-GB'], dateOption).format(new Date());


    articles.paginate({storyDate: { '$regex' : allStories, '$options' : 'i' }}, {offset: (pagination_limit * pagination_page), limit: pagination_limit}).then((articleDocs) => {
        articles.findRandom({storyDate: { '$regex' : featuredStories, '$options' : 'i' }}, {}, {limit: 10}, (err, featured) => {
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
    articles.paginate({category: req.params.category}, {
        offset: (pagination_page * pagination_limit),
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
    articles.find({title: { '$regex' : req.params.term, '$options' : 'i' }}).then(docs => {
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