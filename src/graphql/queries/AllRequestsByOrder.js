import gql from 'graphql-tag';

import orderInfoFragment from '@/graphql/fragments/orders/order';
import requestInfoFragment from '@/graphql/fragments/requests/request';
import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  query Requests($order_id: ID!) {
    requests(order_id: $order_id, orderBy: [{ field: "status", order: DESC }]) {
      ...requestInfo
      user {
        ...userInfo
      }
      order {
        ...orderInfo
      }
    }
  }

  ${orderInfoFragment}
  ${requestInfoFragment}
  ${userInfoFragment}
`;
