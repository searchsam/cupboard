import gql from 'graphql-tag';

import pantryInfoFragment from '@/graphql/fragments/pantries/pantry';
import requestInfoFragment from '@/graphql/fragments/requests/request';

export default gql`
  query Products {
    products {
      ...pantryInfo
      request {
        ...requestInfo
      }
    }
  }

  ${pantryInfoFragment}
  ${requestInfoFragment}
`;
