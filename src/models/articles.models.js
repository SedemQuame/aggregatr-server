// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// ==================================== document schema=======================================//
const articleSchema = new mongoose.Schema({
    source: { type: String },
    title: { type: String },
    category: { type: String },
    author: { type: String },
    storyDate: { type: String },
    paragraphs: { type: String },
    image: { type: String }
});

articleSchema.plugin(passportLocalMongoose);

// ==================================== creating schema model =========================================//
module.exports = mongoose.model('articles', articleSchema);