import gql from 'graphql-tag';

import orderInfoFragment from '@/graphql/fragments/orders/order';

export default gql`
  query CurrentOrder($id: ID!) {
    order(id: $id) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
