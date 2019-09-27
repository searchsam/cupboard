import gql from 'graphql-tag';

import orderInfoFragment from '../fragments/orders/order';

export default gql`
  query CurrentOrder($id: ID!) {
    order(id: $id) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
