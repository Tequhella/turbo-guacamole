import React from 'react';
import { useQuery, ApolloProvider } from '@apollo/client';
import UserList from './UserList';
import clientMySQL from '../clientMySQL';
import clientMongoDB from '../clientMongoDB';
import { GET_USERS, DELETE_USER_MONGODB, DELETE_USER_MYSQL  } from '../queries/queriesUser';

const Dashboard = () => {
  return (
  <div>
    <h2>Tableau de bord</h2>
    <ul>
      <li>
        <ApolloProvider client={clientMongoDB}>
          <div className="App">
            <UserList api_name={"MongoDB"} delete_user={DELETE_USER_MONGODB} />
          </div>
        </ApolloProvider>
      </li>
      <li>
        <ApolloProvider client={clientMySQL}>
          <div className="App">
            <UserList api_name={"MySQL"} delete_user={DELETE_USER_MYSQL} />
          </div>
        </ApolloProvider>
      </li>
    </ul>
  </div>
);
};

export default Dashboard;
