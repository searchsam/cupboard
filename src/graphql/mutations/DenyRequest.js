import gql from 'graphql-tag';

import requestInfoFragment from '@/graphql/fragments/requests/request';

export default gql`
  mutation DenyRequest($id: ID!) {
    denyRequest(id: $id) {
      ...requestInfo
    }
  }

  ${requestInfoFragment}
`;
