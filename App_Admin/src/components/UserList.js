import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../queries/queriesUser';

const UserList = (props) => {
  const { loading, error, data } = useQuery(GET_USERS, {
    context: { apiName: props.api_name }
  });
  
  const [deleteUser, { data: deletedUserData }] = useMutation(props.delete_user, {
    update(cache, { data: { deleteUser } }) {
      const { getAllUsers } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { getAllUsers: getAllUsers.filter((user) => user._id !== deleteUser._id) },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error.message}</p>;
  
  if (!data || !data.getAllUsers) return null;
  
  const handleDeleteUser = async (_id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await deleteUser({ variables: { _id } });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>{props.api_name} Users</h2>
      <ul>
        {data.getAllUsers.map((user, index) => (
          <li key={`user-${index}`}>
            ID: [{user._id}] - PRENOM: [{user.firstname}] - NOM: [{user.lastname}] - EMAIL: [{user.email}] - DATE NAISSANCE: [{user.birthdate}] - VILLE: [{user.city}] - CODE POSTAL: [{user.zipcode}] | <button onClick={() => handleDeleteUser(user._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

