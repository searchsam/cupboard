import gql from 'graphql-tag';

export default gql`
  fragment requestInfo on Request {
    id
    description
    quantity
    status
    createdAt
    updatedAt
  }
`;
