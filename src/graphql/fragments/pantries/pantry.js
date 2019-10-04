import gql from 'graphql-tag';

export default gql`
  fragment pantryInfo on Pantry {
    id
    existence
    createdAt
    updatedAt
  }
`;
