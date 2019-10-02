import gql from 'graphql-tag';

import requestInfoFragment from '@/graphql/fragments/requests/request';

export default gql`
  mutation ApproveRequest($id: ID!) {
    approveRequest(id: $id) {
      ...requestInfo
    }
  }

  ${requestInfoFragment}
`;
