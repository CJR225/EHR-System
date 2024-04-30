import React, { useContext } from 'react';
import { OrdersContext } from './OrdersContext';

function Student() {
  const { orders } = useContext(OrdersContext);

  return (
    <div>
      {orders.filter(order => order.isVisible).map((order) => (
        <div key={order.order_id}>
          <p><strong>Description:</strong> {order.description}</p>
        </div>
      ))}
    </div>
  );
}