import React from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import styles from '../styles.module.css';

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
    const [stockSearched, setStockSearch] = useState('');

    // Create User States

    // const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: stockData, loading, error, refetch } = useQuery(QUERY_ALL_STOCKS);
    const [fetchStock, { data: stockSearchData, error: stockNotFound, loading: stockLoading }] = useLazyQuery(GET_STOCK_BY_SYMBOL);

    if (loading) {
        return (
            <div className={styles.loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    if (error) {
        return <h1 className={styles.offline}>API offline</h1>;
    }

    console.log(stockSearchData);

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
                    <input type="text" placeholder="Ticker.." onChange={(event) => setStockSearch(event.target.value.toLocaleUpperCase())} />

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
                                <h1>Name: {stockSearchData.stock.instrument_info.name} </h1>
                                <h1>Symbol: {stockSearchData.stock.instrument_info.symbol} </h1>
                            </div>
                        )}
                        {stockLoading && <h1>Searching...</h1>}
                        {stockNotFound && <h1>No data found..</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
};
