const { model, Schema } = require('mongoose');

const feedSchema = new Schema({
    feed: String,
    created: String,
});

module.exports = model('Feed', feedSchema);
