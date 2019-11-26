import gql from 'graphql-tag';

import requestInfoFragment from '@/graphql/fragments/requests/request';
import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  subscription onRequestCreated($order_id: ID!) {
    requestCreated(order_id: $order_id) {
      ...requestInfo
      user {
        ...userInfo
      }
    }
  }

  ${requestInfoFragment}
  ${userInfoFragment}
`;
