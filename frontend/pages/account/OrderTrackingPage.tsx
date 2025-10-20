import React from "react";
import type { Order } from "../../types";
// Esta enum 'OrderStatus' provavelmente está errada, mas vamos contornar
// import { OrderStatus } from '../../types';
import PrimaryButton from "../../components/ui/PrimaryButton";

interface OrderTrackingPageProps {
  orderId: string;
  orders: Order[];
}

// Vamos definir os status aqui, pois os do seu back-end parecem ser strings
const statuses = ["Pedido Confirmado", "Em Preparo", "A Caminho", "Entregue"];
// O 'OrderStatus.OnTheWay' do seu código antigo não corresponde ao seu back-end
const onTheWayStatus = "A Caminho";

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  orderId,
  orders,
}) => {
  // ==================================================================
  // CORREÇÃO 1: Convertemos 'orderId' para número para o 'find'.
  // ==================================================================
  const orderIdAsNumber = parseInt(orderId, 10);
  const order = orders.find((o) => o.id === orderIdAsNumber); // Esta verificação agora funciona corretamente.

  if (!order) {
    return <div className="p-4 text-center">Pedido não encontrado.</div>;
  } // ================================================================== // CORREÇÃO 2: Usamos 'statusPedido' (a string do seu JSON) // ==================================================================

  const currentStatusIndex = order ? statuses.indexOf(order.statusPedido) : -1;

  return (
    <div className="p-4 space-y-6">
                 {" "}
      <div>
                       {" "}
        <h2 className="text-2xl font-bold text-title mb-1">
          Acompanhar Pedido
        </h2>
                       {" "}
        {/* ================================================================== */
        /* CORREÇÃO 3: Usamos 'dataPedido' e formatamos */
        /* ================================================================== */}
                       {" "}
        <p className="text-body-text">
          Pedido <span className="font-bold">#{order.id}</span> -{" "}
          {new Date(order.dataPedido).toLocaleDateString("pt-BR")}
        </p>
                   {" "}
      </div>
                 {" "}
      <div className="relative pl-4">
                       {" "}
        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-300"></div>
                       {" "}
        {statuses.map((status, index) => (
          <div key={status} className="flex items-center mb-8 relative">
                                   {" "}
            <div
              className={`w-4 h-4 rounded-full z-10 ${
                index <= currentStatusIndex ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
                                   {" "}
            <p
              className={`ml-6 font-semibold ${
                index <= currentStatusIndex ? "text-title" : "text-gray-500"
              }`}
            >
              {status}
            </p>
                               {" "}
          </div>
        ))}
                   {" "}
      </div>
                             {" "}
      {order.statusPedido === onTheWayStatus && (
        <PrimaryButton
          onClick={() =>
            alert(
              "Funcionalidade de rastreio em tempo real indisponível no momento."
            )
          }
        >
                              RASTREAR ENTREGA                {" "}
        </PrimaryButton>
      )}
                             {" "}
      <div className="bg-white p-4 rounded-lg shadow-sm">
                       {" "}
        <h3 className="font-bold text-lg text-title mb-3">Resumo do Pedido</h3> 
                     {" "}
        <div className="space-y-3">
                             {" "}
          {/* ================================================================== */
          /* CORREÇÃO 4: Usamos 'order.itens' e as propriedades do DTO de item */
          /* (nomeProduto, quantidade, subtotal) */
          /* ================================================================== */}
                             {" "}
          {order.itens.map((item, index) => (
            <div key={index} className="flex items-center">
                                         {" "}
              {/* Não temos a imagem do cupcake neste DTO, então colocamos um placeholder */}
                                         {" "}
              <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">
                ?
              </div>
                                         {" "}
              <div className="flex-grow ml-4">
                                               {" "}
                <p className="font-semibold">{item.nomeProduto}</p>             
                                 {" "}
                <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p> 
                                         {" "}
              </div>
                                         {" "}
              <p className="font-semibold">
                R$ {item.subtotal.toFixed(2).replace(".", ",")}
              </p>
                                     {" "}
            </div>
          ))}
                         {" "}
        </div>
                       {" "}
        <div className="border-t mt-4 pt-3 flex justify-between font-bold text-title">
                              <span>Total</span>                   {" "}
          {/* ================================================================== */
          /* CORREÇÃO 5: Usamos 'valorTotal' */
          /* ================================================================== */}
                             {" "}
          <span>R$ {order.valorTotal.toFixed(2).replace(".", ",")}</span>       
                 {" "}
        </div>
                   {" "}
      </div>
                 {" "}
      <div className="bg-white p-4 rounded-lg shadow-sm">
                       {" "}
        <h3 className="font-bold text-lg text-title mb-2">
          Endereço de Entrega
        </h3>
                       {" "}
        {/* ================================================================== */
        /* CORREÇÃO 6: Usamos 'enderecoCompleto' (string) */
        /* ================================================================== */}
                        <p>{order.enderecoCompleto}</p>           {" "}
      </div>
             {" "}
    </div>
  );
};

export default OrderTrackingPage;
