import gql from 'graphql-tag';

import orderInfoFragment from '@/graphql/fragments/orders/order';

export default gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
