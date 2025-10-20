import React from "react";
import type { Route, Order } from "../../types";
import { CheckCircleIcon } from "../../components/Icons";
import PrimaryButton from "../../components/ui/PrimaryButton";

interface CheckoutSuccessPageProps {
  setRoute: (route: Route) => void;
  orderId: string; // A prop orderId vem como string da rota
  orders: Order[];
}

const CheckoutSuccessPage: React.FC<CheckoutSuccessPageProps> = ({
  setRoute,
  orderId,
  orders,
}) => {
  // ==================================================================
  // CORREÇÃO 1: Convertemos a prop string 'orderId' para número.
  // ==================================================================
  const orderIdAsNumber = parseInt(orderId, 10);
  const order = orders.find((o) => o.id === orderIdAsNumber); // ================================================================== // CORREÇÃO 2: Adicionamos uma verificação. Se o pedido não foi // encontrado (undefined), mostramos um "Carregando..." // Isso previne o crash do '.toFixed()'. // ==================================================================

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 min-h-full">
                       {" "}
        <h2 className="text-xl text-body-text">
          Carregando detalhes do pedido...
        </h2>
                   {" "}
      </div>
    );
  } // Se o 'order' foi encontrado, o código abaixo agora funciona com segurança.

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 min-h-full">
                  <CheckCircleIcon className="w-24 h-24 text-green-500 mb-4" /> 
               {" "}
      <h2 className="text-3xl font-serif text-title">Pedido Recebido!</h2>     
           {" "}
      <p className="text-body-text mt-2 mb-6">
        Obrigado! Seu pedido já está sendo preparado.
      </p>
                 {" "}
      <div className="bg-white p-4 rounded-lg shadow-sm text-left w-full max-w-sm">
                       {" "}
        <p>
          <strong>Número do Pedido:</strong> #{order.id}
        </p>
                       {" "}
        <p>
          <strong>Data:</strong>{" "}
          {new Date(order.dataPedido).toLocaleDateString("pt-BR")}
        </p>
                       {" "}
        <p>
          <strong>Valor Total:</strong> R${" "}
          {order.valorTotal.toFixed(2).replace(".", ",")}
        </p>
                   {" "}
      </div>
                 {" "}
      <PrimaryButton
        className="mt-6"
        onClick={() => setRoute({ name: "orderHistory" })}
      >
                        ACOMPANHAR MEU PEDIDO            {" "}
      </PrimaryButton>
             {" "}
    </div>
  );
};

export default CheckoutSuccessPage;
