import React from "react";
import type { Order, Cupcake } from "../../types";

// A interface agora só precisa das props de dados
interface AdminDashboardPageProps {
  orders: Order[];
  products: Cupcake[];
}

const StatCard: React.FC<{
  title: string;
  value: number | string;
  color: string;
}> = ({ title, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-28">
    <p className="text-gray-600 font-semibold">{title}</p>
    <p className={`text-4xl font-bold self-end ${color}`}>{value}</p>
  </div>
);

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  orders,
  products,
}) => {
  // A lógica de cálculo permanece a mesma
  const hoje = new Date().toLocaleDateString("pt-BR");
  const pedidosHoje = orders.filter(
    (o) => new Date(o.dataPedido).toLocaleDateString("pt-BR") === hoje
  ).length;
  const pedidosPendentes = orders.filter(
    (o) => o.statusPedido !== "Entregue"
  ).length;
  const pedidosFinalizados = orders.filter(
    (o) => o.statusPedido === "Entregue"
  ).length;
  const produtosAtivos = products.filter((p) => p.active).length;

  return (
    // O container principal foi simplificado
    <div className="p-4 space-y-6">
      {/* O título do conteúdo permanece, mas o botão "Sair" foi removido */}
      <h2 className="text-2xl font-bold text-title">Resumo Geral</h2>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Pedidos Hoje"
          value={pedidosHoje}
          color="text-blue-500"
        />
        <StatCard
          title="Pendentes"
          value={pedidosPendentes}
          color="text-yellow-500"
        />
        <StatCard
          title="Finalizados"
          value={pedidosFinalizados}
          color="text-green-500"
        />
        <StatCard
          title="Produtos Ativos"
          value={produtosAtivos}
          color="text-primary"
        />
      </div>

      <div>
        <h3 className="text-xl font-bold text-title mb-2">Últimos Pedidos</h3>
        <div className="space-y-3">
          {orders
            .sort(
              (a, b) =>
                new Date(b.dataPedido).getTime() -
                new Date(a.dataPedido).getTime()
            )
            .slice(0, 5)
            .map((order) => (
              <div key={order.id} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-title">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.nomeCliente}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      R$ {order.valorTotal.toFixed(2).replace(".", ",")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.statusPedido}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {orders.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Nenhum pedido encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
