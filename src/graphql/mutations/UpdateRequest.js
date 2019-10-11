import gql from 'graphql-tag';

import requestInfoFragment from '@/graphql/fragments/requests/request';

export default gql`
  mutation UpdateRequest($input: UpdateRequestInput!) {
    updateRequest(input: $input) {
      ...requestInfo
    }
  }

  ${requestInfoFragment}
`;
