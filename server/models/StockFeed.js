const { model, Schema } = require('mongoose');

const feedSchema = new Schema({
    feed: String,
});

module.exports = model('Feed', feedSchema);
