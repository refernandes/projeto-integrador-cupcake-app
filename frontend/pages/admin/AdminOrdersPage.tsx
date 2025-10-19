
import React, { useState, useMemo } from 'react';
import type { Order, Route } from '../../types';
import { OrderStatus } from '../../types';

interface AdminOrdersPageProps {
    orders: Order[];
    setRoute: (route: Route) => void;
}

const AdminOrdersPage: React.FC<AdminOrdersPageProps> = ({ orders, setRoute }) => {
    const [filter, setFilter] = useState<OrderStatus | 'Todos'>('Todos');

    const statusColors: Record<OrderStatus, string> = {
        [OrderStatus.Confirmed]: "bg-blue-100 text-blue-700",
        [OrderStatus.Preparing]: "bg-yellow-100 text-yellow-700",
        [OrderStatus.OnTheWay]: "bg-indigo-100 text-indigo-700",
        [OrderStatus.Delivered]: "bg-green-100 text-green-700",
    };

    const filterOptions: (OrderStatus | 'Todos')[] = ['Todos', ...Object.values(OrderStatus)];

    const filteredOrders = useMemo(() => {
        if (filter === 'Todos') return orders;
        return orders.filter(order => order.status === filter);
    }, [orders, filter]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-title mb-4">Gerenciar Pedidos</h2>
            
            <div className="flex space-x-2 overflow-x-auto pb-3 mb-2 -mx-4 px-4 no-scrollbar">
                {filterOptions.map(option => (
                     <button 
                        key={option} 
                        onClick={() => setFilter(option)} 
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                            filter === option 
                            ? 'bg-primary text-white shadow' 
                            : 'bg-white text-body-text border border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start">
                           <div>
                                <p className="font-bold text-title">Pedido {order.id}</p>
                                <p className="text-sm text-gray-600">{order.user.name}</p>
                                <p className="text-sm text-gray-500">{order.date}</p>
                           </div>
                           <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                        </div>
                        <button onClick={() => setRoute({ name: 'adminOrderDetail', orderId: order.id })} className="text-primary font-semibold mt-2 text-sm">Ver Detalhes / Alterar Status</button>
                    </div>
                ))}
                {filteredOrders.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Nenhum pedido encontrado para este status.</p>}
            </div>
        </div>
    );
}

export default AdminOrdersPage;