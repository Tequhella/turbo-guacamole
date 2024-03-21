import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    getAllUsers {
      _id
      firstname
      lastname
      email
      birthdate
      city
      zipcode
    }
  }
`;

export const DELETE_USER_MONGODB = gql`
  mutation DeleteUser($_id: ID!) {
    deleteUser(id: $_id)
  }
`;

export const DELETE_USER_MYSQL = gql`
  mutation DeleteUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;
