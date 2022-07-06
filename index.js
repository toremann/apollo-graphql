const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers')
const { UserList } = require('./FakeData')
const open = require('open')

const server = new ApolloServer({ typeDefs, resolvers });
const amountOfUsers = UserList.length

server.listen().then(({url}) => {
    open(url)
    console.log(`Server running: ${url}, currently ${amountOfUsers} fake users in DB`);
});