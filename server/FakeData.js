const UserList = [
  {
    id: 1,
    name: "Tore",
    username: "john",
    age: 20,
    nationality: "Canada",
    friends: [
      {
        id: 2,
        name: "Nemetiss",
        username: "neme",
        age: 38,
        nationality: "Australia",
      },
      {
        id: 3,
        name: "Christian",
        username: "john3",
        age: 23,
        nationality: "Canada3",
      },
    ],
  },
  {
    id: 2,
    name: "Jack has no friends",
    username: "jack",
    age: 52,
    nationality: "Sweden",
  },
  {
    id: 3,
    name: "John3",
    username: "john3",
    age: 23,
    nationality: "Canada3",
  },
  {
    id: 4,
    name: "John3",
    username: "john3",
    age: 24,
    nationality: "Canada4",
  },
  {
    id: 5,
    name: "John3",
    username: "john3",
    age: 25,
    nationality: "Canada5",
  },
];

const MovieList = [
    {
        id: 1,
        name: 'Scary Movie',
        yearOfPublication: 2019,
        isInTheaters: true,
    },
    {
        id: 2,
        name: 'Scary Movie 2',
        yearOfPublication: 2020,
        isInTheaters: true,
    },
    {
        id: 3,
        name: 'Scary Movie 3',
        yearOfPublication: 2021,
        isInTheaters: false,
    },
]

module.exports = { UserList, MovieList };
