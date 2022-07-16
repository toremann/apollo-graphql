const { gql } = require('apollo-server');

const typeDefs = gql`
    type Stock {
        instrument_info: InstrumentInfo
        status_info: StatusInfo
        company_info: CompanyInfo
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

    type CompanyInfo {
        dividend_amount: Float

        #if null, do something?
    }

    type Query {
        stocks: [Stock!]!
        stock(symbol: String!): Stock!
    }
`;

module.exports = { typeDefs };
