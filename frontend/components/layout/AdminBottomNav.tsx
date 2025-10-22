// Local: /frontend/src/components/layout/AdminBottomNav.tsx
import React from "react";
import type { Route } from "../../types";

// Ícones simples em SVG para evitar instalar novas bibliotecas
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);
const ProductsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
    />
  </svg>
);
const OrdersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? "text-primary" : "text-gray-500"
    }`}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

interface AdminBottomNavProps {
  setRoute: (route: Route) => void;
  activeRoute: Route["name"];
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({
  setRoute,
  activeRoute,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] flex justify-around">
      <NavButton
        label="Dashboard"
        icon={<DashboardIcon />}
        isActive={activeRoute === "adminDashboard"}
        onClick={() => setRoute({ name: "adminDashboard" })}
      />
      <NavButton
        label="Produtos"
        icon={<ProductsIcon />}
        isActive={activeRoute === "adminManageProducts"}
        onClick={() => setRoute({ name: "adminManageProducts" })}
      />
      <NavButton
        label="Pedidos"
        icon={<OrdersIcon />}
        isActive={activeRoute === "adminManageOrders"}
        onClick={() => setRoute({ name: "adminManageOrders" })}
      />
    </div>
  );
};
