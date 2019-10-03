import gql from 'graphql-tag';

export default gql`
  fragment orderInfo on Order {
    id
    deadline
    name
    status
    createdAt
    updatedAt
  }
`;
