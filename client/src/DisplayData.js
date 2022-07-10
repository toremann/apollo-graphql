import React from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const QUERY_ALL_USERS = gql`
    query getAllUser {
        users {
            id
            name
            age
            username
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query getAllMovies {
        movies {
            name
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            name
            id
        }
    }
`;

export const DisplayData = () => {
    const [movieSearched, setMovieSearch] = useState('');

    // Create User States
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState('');

    const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchData, error: movieError }] =
        useLazyQuery(GET_MOVIE_BY_NAME);

    const [createUser] = useMutation(CREATE_USER_MUTATION);

    if (loading) {
        return <h1>Loading..</h1>;
    }

    if (error) {
        return <h1>API offline</h1>;
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Name.."
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username.."
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age.."
                    onChange={(event) => setAge(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nationality.."
                    onChange={(event) => setNationality(event.target.value)}
                />
                <button
                    onClick={() => {
                        createUser({
                            variables: {
                                input: {
                                    name,
                                    username,
                                    age: Number(age),
                                    nationality,
                                },
                            },
                        });

                        refetch();
                    }}
                >
                    Create User
                </button>
            </div>
            <div>
                {data &&
                    data.users.map((user) => {
                        return (
                            <div>
                                <h1>Name: {user.name} </h1>
                                <h1>Username: {user.username} </h1>
                                <h1>Age: {user.age} </h1>
                            </div>
                        );
                    })}
            </div>
            <div>
                {movieData &&
                    movieData.movies.map((movie) => {
                        return (
                            <div>
                                <h1>Movie: {movie.name} </h1>
                            </div>
                        );
                    })}
                <div>
                    <input
                        type="text"
                        placeholder="search"
                        onChange={(event) => setMovieSearch(event.target.value)}
                    />

                    <button
                        onClick={() => {
                            fetchMovie({
                                variables: {
                                    name: movieSearched,
                                },
                            });
                        }}
                    >
                        Fetch data{' '}
                    </button>
                    <div>
                        {movieSearchData && (
                            <div>
                                <h1>Movie: {movieSearchData.movie.name} </h1>
                            </div>
                        )}
                        {movieError && <h1>No data found..</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
};
