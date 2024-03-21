import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ADMINS } from '../queries/queriesAdmin';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const { loading, error, data } = useQuery(GET_ADMINS, {
    context: { apiName: props.api_name }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error.message}</p>;
  
  const admins = data && data.getAllAdmins ? data.getAllAdmins : [];

  const handleLogin = () => {
  
  let valid = false;
  
  //console.log("username:", username);
  //console.log("password:", password);
  //console.log("admins:", admins);
  //console.log("data:", data);
    
    for(let i = 0; i < admins.length; i++){
      if(admins[i].username === username && admins[i].password === password) {
        valid = true;
      }
    }
    
    if (valid) {
      console.log("hey");
      navigate('/dashboard');
    } else {
      alert('Username or password incorrect.');
    }
  };

  return (
  
    <div>
      <h2>Connexion</h2>
      <form>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

