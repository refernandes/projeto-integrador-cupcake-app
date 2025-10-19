import React, { useMemo } from 'react';
import type { Route, Order, CartItem, Address } from '../../types';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';

interface CheckoutPaymentPageProps {
    setRoute: (route: Route) => void;
    placeOrder: () => Order | null;
    cart: CartItem[];
    deliveryAddress: Address | null;
}

const CheckoutPaymentPage: React.FC<CheckoutPaymentPageProps> = ({ setRoute, placeOrder, cart, deliveryAddress }) => {
    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.cupcake.price * item.quantity, 0), [cart]);
    const deliveryFee = 5.00;
    const total = subtotal + deliveryFee;

    const handleFinishOrder = () => {
        const newOrder = placeOrder();
        if (newOrder) {
            setRoute({ name: 'orderConfirmation', orderId: newOrder.id });
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold text-title">Pagamento</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                <div>
                    <h3 className="font-bold text-title">Resumo do Pedido</h3>
                     <div className="flex justify-between text-body-text text-sm"><span>Subtotal</span><span>R$ {subtotal.toFixed(2).replace('.', ',')}</span></div>
                    <div className="flex justify-between text-body-text text-sm"><span>Taxa de entrega</span><span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span></div>
                    <div className="flex justify-between font-bold text-lg text-title mt-1"><span>Total</span><span>R$ {total.toFixed(2).replace('.', ',')}</span></div>
                </div>
                {deliveryAddress && (
                    <div className="border-t pt-2">
                        <h3 className="font-bold text-title">Entregar em</h3>
                        <p className="text-sm">{deliveryAddress.street}, {deliveryAddress.number} - {deliveryAddress.city}</p>
                    </div>
                )}
            </div>
            <div className="space-y-3 pt-4">
                <h3 className="font-bold text-title">Dados do Cartão de Crédito</h3>
                <InputField id="cardName" label="Nome no Cartão" value="" onChange={() => {}}/>
                <InputField id="cardNumber" label="Número do Cartão" value="" onChange={() => {}} placeholder="0000 0000 0000 0000"/>
                <div className="grid grid-cols-2 gap-4">
                    <InputField id="cardExpiry" label="Validade" value="" onChange={() => {}} placeholder="MM/AA"/>
                    <InputField id="cardCvv" label="CVV" value="" onChange={() => {}} placeholder="123"/>
                </div>
            </div>
            <PrimaryButton onClick={handleFinishOrder}>FINALIZAR PEDIDO</PrimaryButton>
        </div>
    );
};

export default CheckoutPaymentPage;