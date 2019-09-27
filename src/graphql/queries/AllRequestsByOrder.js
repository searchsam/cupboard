import gql from 'graphql-tag';

import requestInfo from '@/graphql/fragments/requests/request';
import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  query Requests($order_id: ID!) {
    requests(order_id: $order_id) {
      ...requestInfo
      user {
        ...userInfo
      }
    }
  }

  ${requestInfo}
  ${userInfoFragment}
`;
