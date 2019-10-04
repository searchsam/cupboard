import gql from 'graphql-tag';

import orderInfoFragment from '@/graphql/fragments/orders/order';

export default gql`
  query Orders {
    orders(orderBy: [{ field: "deadline", order: ASC }]) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
