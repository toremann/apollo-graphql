const { StockList } = require('../StockData'); // no modules export
const _ = require('lodash');

const resolvers = {
    Query: {
        stocks: () => {
            return StockList;
        },

        stock: (parent, args) => {
            const symbol = args.symbol;
            console.log(symbol);
            const stock = _.find(StockList, (el) => el.instrument_info.symbol === symbol); //shorthand notation
            console.log(stock);
            return stock;
        },
    },
};

module.exports = { resolvers };
