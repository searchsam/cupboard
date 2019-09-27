import gql from 'graphql-tag';

import requestInfoFragment from '../fragments/requests/request';

export default gql`
  mutation CreateRequest($input: CreateRequestInput!) {
    createRequest(input: $input) {
      ...requestInfo
    }
  }

  ${requestInfoFragment}
`;
