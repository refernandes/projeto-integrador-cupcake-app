// Local: /frontend/src/pages/admin/AdminPortal.tsx
import React, { useState } from "react";
import type { Order, Cupcake, Route, OrderStatus } from "../../types";
import { AdminLayout } from "../../components/layout/AdminLayout";

// Importe TODAS as páginas de administração aqui
import AdminDashboardPage from "./AdminDashboardPage";
import AdminProductsPage from "./AdminProductsPage";
import AdminProductFormPage from "./AdminProductFormPage";
import AdminOrdersPage from "./AdminOrdersPage";
import AdminOrderDetailPage from "./AdminOrderDetailPage";

interface AdminPortalProps {
  initialOrders: Order[];
  initialProducts: Cupcake[];
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  initialOrders,
  initialProducts,
  onLogout,
}) => {
  const [adminRoute, setAdminRoute] = useState<Route>({
    name: "adminDashboard",
  });
  const [products, setProducts] = useState<Cupcake[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // As funções de admin agora vivem aqui, isoladas do App.tsx
  const toggleProductStatus = (product: Cupcake) => {
    console.log("TODO: Implementar toggleProductStatus");
  };
  const createProduct = (productData: any) => {
    console.log("TODO: Implementar createProduct");
  };
  const updateProduct = (productId: number, productData: any) => {
    console.log("TODO: Implementar updateProduct");
  };
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    console.log("TODO: Implementar updateOrderStatus");
  };

  const renderAdminPage = () => {
    switch (adminRoute.name) {
      case "adminManageProducts":
        return (
          <AdminProductsPage
            products={products}
            setRoute={setAdminRoute}
            toggleProductStatus={toggleProductStatus}
          />
        );
      case "adminProductForm":
        const productToEdit = products.find(
          (p) => String(p.id) === adminRoute.id
        );
        return (
          <AdminProductFormPage
            setRoute={setAdminRoute}
            product={productToEdit}
            createProduct={createProduct}
            updateProduct={updateProduct}
          />
        );
      case "adminManageOrders":
        return <AdminOrdersPage orders={orders} setRoute={setAdminRoute} />;
      case "adminOrderDetail":
        const orderToView = orders.find(
          (o) => String(o.id) === adminRoute.orderId
        );
        return orderToView ? (
          <AdminOrderDetailPage
            order={orderToView}
            setRoute={setAdminRoute}
            updateOrderStatus={updateOrderStatus}
          />
        ) : (
          <p>Pedido não encontrado</p>
        );
      case "adminDashboard":
      default:
        return <AdminDashboardPage orders={orders} products={products} />;
    }
  };

  return (
    <AdminLayout
      setRoute={setAdminRoute}
      activeRoute={adminRoute.name}
      onLogout={onLogout}
    >
      {renderAdminPage()}
    </AdminLayout>
  );
};
