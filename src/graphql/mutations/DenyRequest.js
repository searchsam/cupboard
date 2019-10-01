import gql from 'graphql-tag';

import requestInfoFragment from '@/graphql/fragments/requests/request';
import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  mutation ApproveRequest($id: ID!) {
    approveRequest(id: $id) {
      ...requestInfo
      user {
        ...userInfo
      }
      order {
        status
      }
    }
  }

  ${requestInfoFragment}
  ${userInfoFragment}
`;
