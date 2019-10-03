import gql from 'graphql-tag';

import requestInfoFragment from '@/graphql/fragments/requests/request';
import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  query Requests($order_id: ID!) {
    requests(order_id: $order_id, orderBy: [{ field: "status", order: DESC }]) {
      ...requestInfo
      user {
        ...userInfo
      }
    }
  }

  ${requestInfoFragment}
  ${userInfoFragment}
`;
