import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// GraphQL Queries and Mutations
const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      age
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      age
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);

  const [newUser, setNewUser] = useState({ name: '', email: '', age: 0 });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateUser = async () => {
    await createUser({ variables: { input: newUser } });
    setNewUser({ name: '', email: '', age: 0 });
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - Age: {user.age}
          </li>
        ))}
      </ul>

      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={newUser.age}
        onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) })}
      />
      <button onClick={handleCreateUser}>Add User</button>
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>GraphQL with MERN</h1>
      <Users />
    </div>
  </ApolloProvider>
);

export default App;
