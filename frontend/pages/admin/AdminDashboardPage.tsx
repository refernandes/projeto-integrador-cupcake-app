import React from 'react';
import type { Route, Order, Cupcake } from '../../types';
import { OrderStatus } from '../../types';

interface AdminDashboardPageProps {
    setRoute: (route: Route) => void;
    orders: Order[];
    products: Cupcake[];
}

const StatCard: React.FC<{ title: string; value: number | string; color: string }> = ({ title, value, color }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-28">
        <p className="text-gray-600 font-semibold">{title}</p>
        <p className={`text-4xl font-bold self-end ${color}`}>{value}</p>
    </div>
);


const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ setRoute, orders, products }) => {
    
    const todayString = new Date().toLocaleDateString('pt-BR');
    const pedidosHoje = orders.filter(o => o.date === todayString).length;
    const pedidosPendentes = orders.filter(o => o.status !== OrderStatus.Delivered).length;
    const pedidosFinalizados = orders.filter(o => o.status === OrderStatus.Delivered).length;
    const produtosAtivos = products.filter(p => p.active).length;

    return (
        <div className="p-4 space-y-6 bg-gray-50 h-full">
            <h2 className="text-2xl font-bold text-title">Resumo Geral</h2>
            <div className="grid grid-cols-2 gap-4">
                <StatCard title="Pedidos Hoje" value={pedidosHoje} color="text-blue-500" />
                <StatCard title="Pendentes" value={pedidosPendentes} color="text-yellow-500" />
                <StatCard title="Finalizados" value={pedidosFinalizados} color="text-green-500" />
                <StatCard title="Produtos Ativos" value={produtosAtivos} color="text-primary" />
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-title mb-2">Últimos Pedidos</h3>
                <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                         <div key={order.id} className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                               <div>
                                    <p className="font-bold text-title">Pedido {order.id}</p>
                                    <p className="text-sm text-gray-600">{order.user.name}</p>
                               </div>
                               <div className="text-right">
                                    <p className="font-bold">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                                    <p className="text-sm text-gray-500">{order.status}</p>
                               </div>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Nenhum pedido encontrado.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;