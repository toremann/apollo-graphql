import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

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

export const DisplayData = () => {
  const [movieSearched, setMovieSearch] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  if (movieError) {
    console.log(movieError);
  }

  return (
    <div>
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
            Fetch data{" "}
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
