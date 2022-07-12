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
        let query = params.req.body.query;

        console.log('vars type', typeof vars);
        console.log(Object.keys(vars).length);

        if (Object.keys(vars).lenght === 0) {
            console.log('no vars');
        } else {
            console.log('it has vars', params.req.body.variables);
        }

        fs.appendFileSync(
            './logs/logs.json',
            JSON.stringify(
                {
                    date: new Date().toLocaleDateString('en-GB'),
                    time: new Date().toLocaleTimeString('en-GB'),
                    ip: params.req.ip,
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
