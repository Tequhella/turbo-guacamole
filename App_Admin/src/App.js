import React from 'react';
import './App.css';
import UserList from './components/UserList';
import { ApolloProvider } from '@apollo/client';
import clientMySQL from './clientMySQL';
import clientMongoDB from './clientMongoDB';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ApolloProvider client={clientMySQL}>
            <div className="App">
              <LoginForm api_name={"MySQL"}/>
            </div>
          </ApolloProvider>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
