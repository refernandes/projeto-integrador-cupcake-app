import React from 'react';
import type { Order } from '../../types';
import { OrderStatus } from '../../types';
import PrimaryButton from '../../components/ui/PrimaryButton';

interface OrderTrackingPageProps {
    orderId: string;
    orders: Order[];
}

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ orderId, orders }) => {
    const order = orders.find(o => o.id === orderId);
    const statuses = [OrderStatus.Confirmed, OrderStatus.Preparing, OrderStatus.OnTheWay, OrderStatus.Delivered];
    const currentStatusIndex = order ? statuses.indexOf(order.status) : -1;

    if (!order) {
        return <div className="p-4 text-center">Pedido não encontrado.</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-title mb-1">Acompanhar Pedido</h2>
                <p className="text-body-text">Pedido <span className="font-bold">{order.id}</span> - {order.date}</p>
            </div>

            <div className="relative pl-4">
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-300"></div>
                {statuses.map((status, index) => (
                    <div key={status} className="flex items-center mb-8 relative">
                        <div className={`w-4 h-4 rounded-full z-10 ${index <= currentStatusIndex ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <p className={`ml-6 font-semibold ${index <= currentStatusIndex ? 'text-title' : 'text-gray-500'}`}>{status}</p>
                    </div>
                ))}
            </div>
            
            {order.status === OrderStatus.OnTheWay && (
                <PrimaryButton onClick={() => alert('Funcionalidade de rastreio em tempo real indisponível no momento.')}>
                    RASTREAR ENTREGA
                </PrimaryButton>
            )}
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-title mb-3">Resumo do Pedido</h3>
                <div className="space-y-3">
                    {order.items.map(item => (
                        <div key={item.cupcake.id} className="flex items-center">
                            <img src={item.cupcake.image} alt={item.cupcake.name} className="w-16 h-16 rounded-md object-cover"/>
                            <div className="flex-grow ml-4">
                                <p className="font-semibold">{item.cupcake.name}</p>
                                <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">R$ {(item.cupcake.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                        </div>
                    ))}
                </div>
                <div className="border-t mt-4 pt-3 flex justify-between font-bold text-title">
                    <span>Total</span>
                    <span>R$ {order.total.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-title mb-2">Endereço de Entrega</h3>
                <p>{order.address.street}, {order.address.number}</p>
                <p>{order.address.neighborhood}, {order.address.city}</p>
                <p>CEP: {order.address.cep}</p>
            </div>

        </div>
    );
};

export default OrderTrackingPage;