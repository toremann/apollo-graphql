import React from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const QUERY_ALL_STOCKS = gql`
    query allStocks {
        stocks {
            instrument_info {
                name
                instrument_id
                long_name
                symbol
            }
            status_info {
                trading_status
            }
        }
    }
`;

const GET_STOCK_BY_SYMBOL = gql`
    query Stock($symbol: String!) {
        stock(symbol: $symbol) {
            instrument_info {
                name
                instrument_id
                long_name
                symbol
            }
            status_info {
                trading_status
            }
        }
    }
`;

export const DisplayData = () => {
    const [movieSearched, setMovieSearch] = useState('');
    const [stockSearched, setStockSearch] = useState('');

    // Create User States

    // const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: stockData, loading, error, refetch } = useQuery(QUERY_ALL_STOCKS);
    const [fetchStock, { data: stockSearchData, error: stockNotFound }] = useLazyQuery(GET_STOCK_BY_SYMBOL);

    if (loading) {
        return <h1>Loading..</h1>;
    }

    if (error) {
        return <h1>API offline</h1>;
    }

    return (
        <div>
            <div>
                {/* {stockData &&
                    stockData.stocks.map((stock) => {
                        return (
                            <div>
                                <h1>{stock.instrument_info.name} </h1>
                            </div>
                        );
                    })} */}
                <div>
                    <input type="text" placeholder="search" onChange={(event) => setStockSearch(event.target.value)} />

                    <button
                        onClick={() => {
                            fetchStock({
                                variables: {
                                    symbol: stockSearched,
                                },
                            });
                        }}
                    >
                        Fetch data{' '}
                    </button>
                    <div>
                        {stockSearchData && (
                            <div>
                                <h1>Stock: {stockSearchData.name} </h1>
                            </div>
                        )}
                        {stockNotFound && <h1>No data found..</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
};
