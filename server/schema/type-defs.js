const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favouriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Stock {
        instrument_info: InstrumentInfo
        status_info: StatusInfo
    }

    type InstrumentInfo {
        instrument_id: ID!
        name: String
        long_name: String
        symbol: String

        #      instrument_info:
        # field --->      name: 'SALMAR',
    }

    type StatusInfo {
        trading_status: String
    }

    type Query {
        stocks: [Stock!]!
        stock(symbol: String!): Stock!
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    enum Nationality {
        Canada
        Canada2
        Canada3
        Canada4
        Canada5
        Sweden
    }
`;

module.exports = { typeDefs };
