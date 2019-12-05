import gql from 'graphql-tag';

import orderInfoFragment from '@/graphql/fragments/orders/order';

export default gql`
  subscription onOrderCreated {
    orderCreated {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
