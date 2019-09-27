import gql from 'graphql-tag';

import orderInfoFragment from '../fragments/orders/order';

export default gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    UpdateOrder(input: $input) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
