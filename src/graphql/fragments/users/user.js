import gql from 'graphql-tag';

export default gql`
  fragment userInfo on User {
    id
    email
    name
    type
    createdAt
    updatedAt
  }
`;
