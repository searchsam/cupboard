import gql from 'graphql-tag';

import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        ...userInfo
      }
    }
  }

  ${userInfoFragment}
`;
