const UserList = [
  {
    id: 1,
    name: "Tore",
    username: "tore",
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
        username: "chris",
        age: 23,
        nationality: "Canada3",
      },
    ],
  },
  {
    id: 2,
    name: "Jack",
    username: "jack",
    age: 52,
    nationality: "Sweden",
  },
  {
    id: 3,
    name: "Sarah",
    username: "sarah",
    age: 23,
    nationality: "Canada3",
  },
  {
    id: 4,
    name: "Flint",
    username: "stone",
    age: 24,
    nationality: "Canada4",
  },
  {
    id: 5,
    name: "Alice",
    username: "whotfis",
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
