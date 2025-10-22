import React, { useState } from "react";
import type { Order, Route, OrderStatus } from "../../types";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { OrderStatus as OrderStatusEnum } from "../../types";

interface AdminOrderDetailPageProps {
  order: Order;
  setRoute: (route: Route) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const AdminOrderDetailPage: React.FC<AdminOrderDetailPageProps> = ({
  order,
  setRoute,
  updateOrderStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const handleSave = () => {
    updateOrderStatus(order.id, currentStatus);
    alert("Status do pedido atualizado com sucesso!");
    setRoute({ name: "adminManageOrders" });
  };

  // ADICIONE ESTE NOVO return() CORRIGIDO
  // ADICIONE ESTE NOVO return() CORRIGIDO
  return (
    <div className="p-4 space-y-4">
                 {" "}
      <h2 className="text-2xl font-bold text-title">Detalhes do Pedido</h2>     
           {" "}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {/* As propriedades agora correspondem ao DTO do back-end */}           
           {" "}
        <p>
          <strong>Pedido:</strong> #{order.id}
        </p>
                       {" "}
        <p>
          <strong>Data:</strong>{" "}
          {new Date(order.dataPedido).toLocaleDateString("pt-BR")}
        </p>
                       {" "}
        <p>
          <strong>Cliente:</strong> {order.nomeCliente}
        </p>
                       {" "}
        <p>
          <strong>Total:</strong> R${" "}
          {order.valorTotal.toFixed(2).replace(".", ",")}
        </p>
                   {" "}
      </div>
                             {" "}
      <div className="bg-white p-4 rounded-lg shadow-sm">
                       {" "}
        <h3 className="font-bold text-lg text-title mb-2">
          Alterar Status do Pedido
        </h3>
                         
        <label
          htmlFor="orderStatus"
          className="block text-sm font-medium text-body-text mb-1"
        >
          Status Atual
        </label>
                         
        <select
          id="orderStatus"
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
                             {" "}
          {Object.values(OrderStatusEnum).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
                           
        </select>
                   {" "}
      </div>
                             {" "}
      <div className="bg-white p-4 rounded-lg shadow-sm">
                       {" "}
        <h3 className="font-bold text-lg text-title mb-3">Itens do Pedido</h3> 
                     {" "}
        <div className="space-y-3">
          {/* A estrutura dos itens também foi corrigida */}                   {" "}
          {order.itens.map((item, index) => (
            <div
              key={`${item.produto.id}-${index}`}
              className="flex items-center"
            >
                                         {" "}
              <img
                src={item.produto.imagemUrl}
                alt={item.produto.nome}
                className="w-16 h-16 rounded-md object-cover"
              />
                                         {" "}
              <div className="flex-grow ml-4">
                                               {" "}
                <p className="font-semibold">{item.produto.nome}</p>           
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
      </div>
                 {" "}
      <div className="bg-white p-4 rounded-lg shadow-sm">
                       {" "}
        <h3 className="font-bold text-lg text-title mb-2">
          Endereço de Entrega
        </h3>
        {/* O endereço completo agora vem de um único campo */}               {" "}
        <p>{order.enderecoCompleto}</p>           {" "}
      </div>
                 {" "}
      <PrimaryButton onClick={handleSave}>SALVAR ALTERAÇÕES</PrimaryButton>     
           {" "}
      <button
        onClick={() => setRoute({ name: "adminManageOrders" })}
        className="w-full text-center text-primary font-semibold py-2"
      >
        Voltar
      </button>
             {" "}
    </div>
  );
};

export default AdminOrderDetailPage;
