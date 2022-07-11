const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers');
const { UserList } = require('./FakeData');
const open = require('open');
const fs = require('fs');

// const lastId = logFile[logFile.length - 1].id;
// const id = lastId + 1;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (params) => () => {
        fs.appendFileSync(
            './logs/logs.json',
            JSON.stringify(
                {
                    date: new Date().toLocaleDateString('en-GB'),
                    time: new Date().toLocaleTimeString('en-GB'),
                    ip: params.req.ip,
                    query: 'some query',
                },
                null,
                4
            )
        );
    },
});

const amountOfUsers = UserList.length;

server.listen().then(({ url }) => {
    // open(url)
    console.log(`Server running: ${url}, currently ${amountOfUsers} fake users in DB`);
});
