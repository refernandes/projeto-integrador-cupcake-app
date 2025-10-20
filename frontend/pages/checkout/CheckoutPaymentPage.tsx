// Local: /frontend/src/pages/checkout/CheckoutPaymentPage.tsx

import React, { useState, useMemo } from "react";
import type { Route, Order, CartItem, Address } from "../../types";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";

interface CheckoutPaymentPageProps {
  setRoute: (route: Route) => void;
  placeOrder: () => Promise<Order | null>;
  cart: CartItem[];
  deliveryAddress: Address | null;
}

const CheckoutPaymentPage: React.FC<CheckoutPaymentPageProps> = ({
  setRoute,
  placeOrder,
  cart,
  deliveryAddress,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(
    () =>
      cart.reduce((acc, item) => acc + item.cupcake.price * item.quantity, 0),
    [cart]
  );
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;

  const handleFinishOrder = async () => {
    // Log para confirmar que a função foi chamada
    console.log("handleFinishOrder foi acionado!");

    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const newOrder = await placeOrder();
      if (newOrder) {
        setRoute({ name: "orderConfirmation", orderId: newOrder.id });
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-title">Pagamento</h2>

      {/* ... seu JSX de resumo e formulário permanece igual ... */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
        <div>
          <h3 className="font-bold text-title">Resumo do Pedido</h3>
          <div className="flex justify-between text-body-text text-sm">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
          </div>
          <div className="flex justify-between text-body-text text-sm">
            <span>Taxa de entrega</span>
            <span>R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-title mt-1">
            <span>Total</span>
            <span>R$ {total.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
        {deliveryAddress && (
          <div className="border-t pt-2">
            <h3 className="font-bold text-title">Entregar em</h3>
            <p className="text-sm">
              {deliveryAddress.rua}, {deliveryAddress.numero} -{" "}
              {deliveryAddress.cidade}
            </p>
          </div>
        )}
      </div>
      <div className="space-y-3 pt-4">
        <h3 className="font-bold text-title">Dados do Cartão de Crédito</h3>
        <InputField id="cardName" label="Nome no Cartão" />
        <InputField
          id="cardNumber"
          label="Número do Cartão"
          placeholder="0000 0000 0000 0000"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField id="cardExpiry" label="Validade" placeholder="MM/AA" />
          <InputField id="cardCvv" label="CVV" placeholder="123" />
        </div>
      </div>

      {error && <p className="text-center text-red-500 text-sm">{error}</p>}

      <div className="mt-6 space-y-2">
        {/* O seu botão original */}
        <PrimaryButton
          onClick={handleFinishOrder}
          disabled={loading}
          className="relative z-50" // <-- ADICIONE ESTAS CLASSES
        >
          {loading ? "Finalizando..." : "FINALIZAR PEDIDO (Componente)"}
        </PrimaryButton>

        {/* ================================================================== */}
        {/* O NOSSO BOTÃO DE TESTE */}
        {/* ================================================================== */}
        <button
          onClick={handleFinishOrder}
          disabled={loading}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "0.75rem",
            borderRadius: "8px",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          {loading ? "Processando..." : "BOTÃO DE TESTE (HTML Puro)"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
