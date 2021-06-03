import React from 'react';

// Services
import OrderServer from '../services/order.service';

//Pages/Components
import { Order } from './Order';

export function OrdersList({ orders, orderType, loadOrders }) {
  async function onDelete(order) {
    if (isGuide) {
      order.guide.isDeleted = true;
    } else order.buyerUser.isDeleted = true;

    if (order.buyerUser.isDeleted && order.guide.isDeleted) {
      await OrderServer.remove(order._id);
    } else await OrderServer.save(order);

    loadOrders();
  }

  async function orderUpdate(orderUpdated) {
    await OrderServer.save(orderUpdated);
    loadOrders();
  }

  const isGuide = orderType === 'customerOrder';
  return (
    <section className="order-list">
      <h2 className="order-list-title">{isGuide ? 'Customer orders' : 'My orders'}</h2>
      {orders && orders.map(order => <Order key={ order._id } order={ order } onDelete={ onDelete } orderUpdate={ orderUpdate } isGuide={ isGuide } />)}
    </section>
  );
}
