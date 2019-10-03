import gql from 'graphql-tag';

import orderInfoFragment from '@/graphql/fragments/orders/order';
import requestInfoFragment from '@/graphql/fragments/requests/request';
import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  query CurrentOrder($id: ID!) {
    order(id: $id) {
      ...orderInfo
      requests {
        ...requestInfo
        user {
          ...userInfo
        }
      }
    }
  }

  ${orderInfoFragment}
  ${requestInfoFragment}
  ${userInfoFragment}
`;
