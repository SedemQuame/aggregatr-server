// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const passportLocalMongoose = require('passport-local-mongoose');

// ==================================== document schema=======================================//
const articleSchema = new mongoose.Schema({
    source: { type: String },
    title: { type: String },
    category: { type: String },
    author: { type: String },
    storyDate: { type: String },
    paragraphs: [],
    image: { type: String }
});

articleSchema.plugin(mongoosePaginate);
articleSchema.plugin(passportLocalMongoose);

// ==================================== creating schema model =========================================//
module.exports = mongoose.model('articles', articleSchema);