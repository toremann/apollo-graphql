import React from "react";
import { useQuery, gql } from "@apollo/client";

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

export const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  console.log(movieData)


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
      </div>
    </div>
  );
};
