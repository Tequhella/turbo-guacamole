import { gql } from '@apollo/client';

export const GET_ADMINS = gql`
  query {
    getAllAdmins {
      _id
      username
      password
      role
    }
  }
`;
