import gql from 'graphql-tag';

import orderInfoFragment from './fragments/orders/order'

export default gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ...orderInfo
    }
  }

  ${orderInfoFragment}
`;
