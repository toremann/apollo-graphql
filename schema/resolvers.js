const { UserList, MovieList } = require('../FakeData');
const _ = require('lodash')

const resolvers = {
    Query: {
        // USER RESOLVERS
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) }); //shorthand notation
            return user;
        },

        // MOVIE RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie = _.find(MovieList, { name }); //shorthand notation
            return movie;
        },
    },
    User: {
        favouriteMovies: () => {
            return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },
        updateUsername: (parent, args) => {
            const  { id, newUsername } = args.input
            let userUpdate;
            UserList.forEach(() => {
                if (user.id === id) {
                    user.username = newUsername;
                    userUpdate = user
                }
            })

            return userUpdate
        }
    }
};

module.exports = { resolvers }