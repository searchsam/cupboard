import gql from 'graphql-tag';

import userInfoFragment from '../fragments/users/user';

export default gql`
  query CurrentOrder {
    me {
      ...userInfo
    }
  }

  ${userInfoFragment}
`;
