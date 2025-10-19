import React from 'react';
import type { Route, Order } from '../../types';
import { CheckCircleIcon } from '../../components/Icons';
import PrimaryButton from '../../components/ui/PrimaryButton';

interface CheckoutSuccessPageProps {
    setRoute: (route: Route) => void;
    orderId: string;
    orders: Order[];
}

const CheckoutSuccessPage: React.FC<CheckoutSuccessPageProps> = ({ setRoute, orderId, orders }) => {
    const order = orders.find(o => o.id === orderId);
    return (
        <div className="flex flex-col items-center justify-center text-center p-6 min-h-full">
            <CheckCircleIcon className="w-24 h-24 text-green-500 mb-4"/>
            <h2 className="text-3xl font-serif text-title">Pedido Recebido!</h2>
            <p className="text-body-text mt-2 mb-6">Obrigado! Seu pedido já está sendo preparado.</p>
            <div className="bg-white p-4 rounded-lg shadow-sm text-left w-full max-w-sm">
                <p><strong>Número do Pedido:</strong> {order?.id}</p>
                <p><strong>Data:</strong> {order?.date}</p>
                <p><strong>Valor Total:</strong> R$ {order?.total.toFixed(2).replace('.', ',')}</p>
            </div>
            <PrimaryButton className="mt-6" onClick={() => setRoute({ name: 'orderTracking', orderId })}>ACOMPANHAR MEU PEDIDO</PrimaryButton>
        </div>
    );
};

export default CheckoutSuccessPage;
