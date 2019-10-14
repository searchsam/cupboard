import gql from 'graphql-tag';

import userInfoFragment from '@/graphql/fragments/users/user';

export default gql`
  query Users {
    users {
      ...userInfo
    }
  }

  ${userInfoFragment}
`;
