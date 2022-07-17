require('dotenv').config();

const MONGODB = process.env.DB_CONNECT;
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type-defs');
const { resolvers } = require('./schema/resolvers');
const fs = require('fs');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (params) => () => {
        let vars = params.req.body.variables;
        let query = params.req.body.query;

        if (Object.keys(vars).lenght === 0) {
            console.log('Context -> no vars');
        } else {
            console.log('Context ->', params.req.body.variables);
        }

        fs.appendFileSync(
            './logs/graphql_logs.json',
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

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB Connected');

    fs.appendFileSync(
        './logs/mongodb_logs.json',
        JSON.stringify(
            {
                type: 'connected',
                date: new Date().toLocaleDateString('en-GB'),
                time: new Date().toLocaleTimeString('en-GB'),
            },
            null,
            4
        )
    );
});

mongoose.connection.on('error', (err) => {
    logError(err);

    fs.appendFileSync(
        './logs/mongodb_logs.json',
        JSON.stringify(
            {
                type: 'disconnected',
                date: new Date().toLocaleDateString('en-GB'),
                time: new Date().toLocaleTimeString('en-GB'),
            },
            null,
            4
        )
    );
});

server.listen().then(({ url }) => {
    console.log(`Server running: ${url}`);
});
