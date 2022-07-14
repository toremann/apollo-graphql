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
        let vars = params.req.body.variables;
        let query = params.req.body.query; // regex this

        console.log(params.req.body.query);

        if (vars === 'undefined' || Object.keys(vars).length === 0) {
            vars = 'No vars';
        }

        fs.appendFileSync(
            './logs/logs.json',
            JSON.stringify(
                {
                    date: new Date().toLocaleDateString('en-GB'),
                    time: new Date().toLocaleTimeString('en-GB'),
                    ip: params.req.ip,
                    // query: query.replace(/{.*$/s, ''),
                    query: query,
                    variables: vars,
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
