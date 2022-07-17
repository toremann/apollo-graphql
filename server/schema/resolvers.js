const { StockList } = require('../StockData'); // no modules export
const Feed = require('../models/StockFeed');
const _ = require('lodash');

const resolvers = {
    Mutation: {
        async createFeed(parent, { feedInput: { feed } }) {
            const newFeed = new Feed({
                feed: feed,
                date: new Date().toISOString(),
            });

            const res = await newFeed.save();
            console.log(res);
            return {
                id: res.id,
                ...res._doc,
            };
        },
    },
    Query: {
        stocks: () => {
            return StockList;
        },

        stock: (parent, args) => {
            const symbol = args.symbol;
            console.log(`Resolver -> query for: ${symbol}`);
            const stock = _.find(StockList, (el) => el.instrument_info.symbol === symbol); //shorthand notation
            return stock;
        },
        feed: (parent, { ID }) => Feed.findById(ID),
    },
};

module.exports = { resolvers };
