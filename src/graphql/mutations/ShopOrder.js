import gql from 'graphql-tag';

import orderInfoFragment from '@/graphql/fragments/orders/order';

export default gql`
  mutation ShopOrder($id: ID!) {
    shopOrder(id: $id) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
