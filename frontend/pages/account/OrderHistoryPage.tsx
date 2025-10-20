import React from "react";
import type { Order, Route } from "../../types"; // Seu type 'Order' está provavelmente desatualizado, mas podemos corrigir no JSX

interface OrderHistoryPageProps {
  orders: Order[];
  setRoute: (route: Route) => void;
}

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({
  orders,
  setRoute,
}) => {
  // ==================================================================
  // CORREÇÃO 1: Adicionamos uma verificação de segurança
  // para o caso do array de pedidos estar vazio.
  // ==================================================================
  if (orders.length === 0) {
    return (
      <div className="p-4">
                       {" "}
        <h2 className="text-2xl font-bold text-title mb-4">Meus Pedidos</h2>   
                   {" "}
        <p className="text-body-text text-center mt-8">
          Você ainda não fez nenhum pedido.
        </p>
                   {" "}
      </div>
    );
  }

  return (
    <div className="p-4">
                 {" "}
      <h2 className="text-2xl font-bold text-title mb-4">Meus Pedidos</h2>     
           {" "}
      <div className="space-y-3">
                       {" "}
        {
          /* O map agora é seguro, pois 'orders' não está vazio */
          orders.map(
            (
              order // ================================================================== // CORREÇÃO 2: Corrigimos o 'onClick' para passar uma string, // já que o 'id' do pedido (número) precisa ser // compatível com a prop 'orderId' da próxima tela. // ==================================================================
            ) => (
              <div
                key={order.id}
                onClick={() =>
                  setRoute({ name: "orderTracking", orderId: String(order.id) })
                }
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
              >
                                       {" "}
                <div className="flex justify-between items-center">
                                             {" "}
                  <div>
                                                   {" "}
                    <p className="font-bold text-title">Pedido #{order.id}</p> 
                                                 {" "}
                    {/* ==================================================== */
                    /* CORREÇÃO 3: Usamos 'dataPedido' e formatamos a data */
                    /* ==================================================== */}
                                                   {" "}
                    <p className="text-sm text-gray-500">
                                                       {" "}
                      {new Date(order.dataPedido).toLocaleDateString("pt-BR")} 
                                                   {" "}
                    </p>
                                               {" "}
                  </div>
                                             {" "}
                  <div className="text-right">
                                                   {" "}
                    {/* ==================================================== */
                    /* CORREÇÃO 4: Usamos 'valorTotal' */
                    /* ==================================================== */}
                                                   {" "}
                    <p className="font-bold text-body-text">
                                                      R${" "}
                      {order.valorTotal.toFixed(2).replace(".", ",")}           
                                         {" "}
                    </p>
                                                   {" "}
                    {/* ==================================================== */
                    /* CORREÇÃO 5: Usamos 'statusPedido' */
                    /* ==================================================== */}
                                                   {" "}
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                        {order.statusPedido}   
                                                 {" "}
                    </span>
                                               {" "}
                  </div>
                                         {" "}
                </div>
                                   {" "}
              </div>
            )
          )
        }
                   {" "}
      </div>
             {" "}
    </div>
  );
};

export default OrderHistoryPage;
