import './App.css';
import Form from './components/Form/Form';
import { request, gql } from 'graphql-request';

const App = () => {
  const addUser = async (user) => {
  console.log(user);
    const query = gql`
      mutation addUser(
        $user: _User
      ) {
        addUser(
          user: $user
        ) {
          firstname
          lastname
          email
          birthdate
          city
          zipcode
        }
      }
    `;

    const variables = {
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      birthdate: user.birthdate,
      city: user.city,
      zipcode: user.zipcode,
    }};

    try {
      const data = await request('http://localhost:5000/graphql', query, variables);
      console.log('User ajouté:', data.addUser);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };

  return (
    <div>
      <h1>Ajouter un utilisateur</h1>
      <Form addUser={addUser} />
    </div>
  );
};

export default App;
