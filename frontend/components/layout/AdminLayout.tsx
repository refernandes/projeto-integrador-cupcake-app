// Local: /frontend/src/components/layout/AdminLayout.tsx
import React from "react";
import type { Route } from "../../types";
import { AdminBottomNav } from "./AdminBottomNav";

interface AdminLayoutProps {
  children: React.ReactNode; // Aceita as páginas filhas como prop
  setRoute: (route: Route) => void;
  activeRoute: Route["name"];
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  setRoute,
  activeRoute,
  onLogout,
}) => {
  // Mapeia a rota atual para um título amigável
  const getTitle = (routeName: Route["name"]): string => {
    switch (routeName) {
      case "adminDashboard":
        return "Dashboard";
      case "adminManageProducts":
        return "Gerenciar Produtos";
      case "adminProductForm":
        return "Formulário de Produto";
      case "adminManageOrders":
        return "Gerenciar Pedidos";
      case "adminOrderDetail":
        return "Detalhes do Pedido";
      default:
        return "Painel do Administrador";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">{getTitle(activeRoute)}</h1>
        <button
          onClick={onLogout}
          className="text-sm font-semibold hover:text-gray-300"
        >
          Sair
        </button>
      </header>

      <main className="flex-grow overflow-y-auto bg-gray-50 pb-16">
        {children}
      </main>

      <AdminBottomNav setRoute={setRoute} activeRoute={activeRoute} />
    </div>
  );
};
