import gql from 'graphql-tag';

import pantryInfoFragment from '@/graphql/fragments/pantries/pantry';

export default gql`
  mutation DecreaseProduct($id: ID!) {
    decrease(id: $id) {
      ...pantryInfo
    }
  }

  ${pantryInfoFragment}
`;
