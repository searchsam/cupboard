import gql from 'graphql-tag';

import orderInfoFragment from '../fragments/orders/order';
import userInfoFragment from '../fragments/users/user';

export default gql`
  query Requests($order_id: ID!) {
    requests(order_id: $order_id) {
      ...orderInfo
      user {
        ...userInfo
      }
    }
  }

  ${orderInfoFragment}
  ${userInfoFragment}
`;
