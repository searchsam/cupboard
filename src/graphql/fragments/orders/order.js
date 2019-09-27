import gql from 'graphql-tag'

export default gql`
  fragment orderInfo on Order {
    id
    name
    status
    deadline
    createdAt
    updatedAt
  }
`
