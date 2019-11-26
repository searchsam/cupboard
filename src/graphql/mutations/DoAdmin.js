import gql from 'graphql-tag';

import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  mutation DoAdmin($id: ID!) {
    doAdmin(id: $id) {
      ...userInfo
    }
  }

  ${userInfoFragment}
`;
