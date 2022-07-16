const { UserList, MovieList } = require('../FakeData'); // modules export
const { StockList } = require('../StockData'); // no modules export
const _ = require('lodash');

const resolvers = {
    Query: {
        stocks: () => {
            return StockList;
        },

        // USER RESOLVERS
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) }); //shorthand notation
            return user;
        },
    },
    User: {
        favouriteMovies: () => {
            return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        },
    },
};

module.exports = { resolvers };
