import React from 'react';
import type { Order, Route } from '../../types';

interface OrderHistoryPageProps {
    orders: Order[];
    setRoute: (route: Route) => void;
}

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders, setRoute }) => (
    <div className="p-4">
        <h2 className="text-2xl font-bold text-title mb-4">Meus Pedidos</h2>
        <div className="space-y-3">
            {orders.map(order => (
                <div key={order.id} onClick={() => setRoute({ name: 'orderTracking', orderId: order.id })} className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-title">Pedido {order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-body-text">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{order.status}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default OrderHistoryPage;
