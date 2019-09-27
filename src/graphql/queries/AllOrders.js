import gql from 'graphql-tag';

import orderInfoFragment from '../fragments/orders/order';

export default gql`
  query Orders {
    orders(
      orderBy: [
        { field: "status", order: DESC }
        { field: "deadline", order: ASC }
      ]
    ) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
