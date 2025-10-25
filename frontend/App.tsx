// Local: /frontend/src/App.tsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import type {
  Cupcake,
  CartItem,
  User,
  Order,
  Address,
  Route,
  OrderStatus,
} from "./types";

// ... Seus imports de componentes de página ...
import MainHeader from "./components/layout/MainHeader";
import BottomNavBar from "./components/layout/BottomNavBar";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ProductCatalogPage from "./pages/catalog/ProductCatalogPage";
import ProductDetailPage from "./pages/catalog/ProductDetailPage";
import CartPage from "./pages/checkout/CartPage";
import CheckoutAddressPage from "./pages/checkout/CheckoutAddressPage";
import CheckoutPaymentPage from "./pages/checkout/CheckoutPaymentPage";
import CheckoutSuccessPage from "./pages/checkout/CheckoutSuccessPage";
import OrderTrackingPage from "./pages/account/OrderTrackingPage";
import AccountPage from "./pages/account/AccountPage";
import EditProfilePage from "./pages/account/EditProfilePage";
import OrderHistoryPage from "./pages/account/OrderHistoryPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductFormPage from "./pages/admin/AdminProductFormPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailPage from "./pages/admin/AdminOrderDetailPage";
import { AdminLayout } from "./components/layout/AdminLayout";
import { API_BASE_URL } from "./src/apiConfig";

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>({ name: "catalog" });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => localStorage.getItem("isAdmin") === "true"
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Cupcake[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (token) {
      if (!isAdmin) {
        const fetchUserData = async () => {
          try {
            const [
              profileResponse,
              addressResponse,
              ordersResponse,
              productsResponse,
            ] = await Promise.all([
              fetch(`${API_BASE_URL}/api/conta/perfil`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              fetch(`${API_BASE_URL}/api/conta/enderecos`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              fetch(`${API_BASE_URL}/api/conta/pedidos`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              fetch(`${API_BASE_URL}/api/produtos`),
            ]);

            if (
              !profileResponse.ok ||
              !addressResponse.ok ||
              !ordersResponse.ok ||
              !productsResponse.ok
            ) {
              throw new Error("Sessão inválida ou expirada.");
            }

            const userData = await profileResponse.json();
            const addressData = await addressResponse.json();
            const ordersData = await ordersResponse.json();
            const productsData = await productsResponse.json();

            setCurrentUser({
              id: userData.id,
              name: userData.nome,
              email: userData.email,
              phone: userData.telefone,
              addresses: addressData,
            });

            if (addressData.length > 0) {
              setDeliveryAddress(addressData[0]);
            }
            setOrders(ordersData);
            setProducts(productsData);
          } catch (error) {
            console.error("Falha ao carregar dados do usuário:", error);
            onLogout();
          }
        };
        fetchUserData();
      } else {
        // Bloco adicionado para carregar dados do admin
        const fetchAdminData = async () => {
          try {
            const [productsResponse, ordersResponse] = await Promise.all([
              fetch(`${API_BASE_URL}/api/admin/produtos`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              // TODO: Certifique-se de que o endpoint /api/admin/pedidos existe
              fetch(`${API_BASE_URL}/api/admin/pedidos`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
            ]);

            if (!productsResponse.ok || !ordersResponse.ok) {
              throw new Error("Falha ao carregar dados de administrador.");
            }

            const productsData = await productsResponse.json();
            const ordersData = await ordersResponse.json();

            setProducts(productsData);
            setOrders(ordersData);
          } catch (error) {
            console.error(error);
            alert(
              "Erro ao carregar dados do painel. Verifique o console. Fazendo logout."
            );
            onLogout();
          }
        };
        fetchAdminData();
      }
    } else {
      setRoute({ name: "login" });
    }
  }, [token, isAdmin]);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const onLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    setCart([]);
    setOrders([]);
    setRoute({ name: "login" });
  };

  const handleAdminLogin = async (loginData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Credenciais de administrador inválidas.");
      }

      const { token: newToken } = await response.json();
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("isAdmin", "true"); // Guarda que é um admin
      setToken(newToken);
      setIsAdmin(true);
      setRoute({ name: "adminDashboard" });
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Funções do carrinho...
  const addToCart = useCallback((cupcake: Cupcake, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.cupcake.id === cupcake.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.cupcake.id === cupcake.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { cupcake, quantity }];
    });
  }, []);

  const updateCartQuantity = useCallback(
    (cupcakeId: number, quantity: number) => {
      setCart((prevCart) => {
        if (quantity <= 0) {
          return prevCart.filter((item) => item.cupcake.id !== cupcakeId);
        }
        return prevCart.map((item) =>
          item.cupcake.id === cupcakeId ? { ...item, quantity } : item
        );
      });
    },
    []
  );

  const removeFromCart = useCallback((cupcakeId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cupcake.id !== cupcakeId)
    );
  }, []);

  // ==================================================================
  // TRECHO 1 ATUALIZADO: Função addAddress movida para o escopo correto
  // ==================================================================
  const addAddress = useCallback(
    async (newAddressData: Omit<Address, "id">) => {
      if (!token) {
        alert("Sessão expirada. Por favor, faça o login novamente.");
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/conta/enderecos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newAddressData),
        });

        if (!response.ok) {
          throw new Error("Não foi possível salvar o endereço.");
        }

        const novoEnderecoSalvo = await response.json();

        // Atualiza o estado local para a UI refletir a mudança instantaneamente
        setCurrentUser((prevUser) => {
          if (!prevUser) return null;
          const updatedAddresses = [...prevUser.addresses, novoEnderecoSalvo];
          return { ...prevUser, addresses: updatedAddresses };
        });
        setDeliveryAddress(novoEnderecoSalvo); // Seleciona o novo endereço como padrão
      } catch (error: any) {
        console.error("Erro ao adicionar endereço:", error);
        alert(error.message);
      }
    },
    [token]
  );

  const placeOrder = useCallback(async (): Promise<Order | null> => {
    // 1. Validações iniciais: garantir que temos todos os dados necessários.
    if (!token) {
      throw new Error("Sessão inválida. Por favor, faça o login novamente.");
    }
    if (!deliveryAddress || !deliveryAddress.id) {
      throw new Error("Endereço de entrega não selecionado.");
    }
    if (cart.length === 0) {
      throw new Error("Seu carrinho está vazio.");
    }

    // 2. Formata os dados para enviar à API (DTO - Data Transfer Object).
    //    Enviamos apenas os IDs e quantidades, não os objetos completos.
    const orderPayload = {
      enderecoId: deliveryAddress.id,
      itens: cart.map((item) => ({
        // <-- 'n' de 'itens'
        produtoId: item.cupcake.id,
        quantidade: item.quantity,
      })),
    };

    try {
      // 3. Executa a chamada de rede para o endpoint do backend.
      const response = await fetch(`${API_BASE_URL}/api/conta/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Envia o token JWT para o Spring Security validar a sessão.
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      // 4. Trata a resposta da API.
      if (!response.ok) {
        const errorData = await response.json();
        // Joga um erro que será capturado pelo 'catch' do handleFinishOrder.
        throw new Error(errorData.message || "Falha ao finalizar o pedido.");
      }

      const newOrder: Order = await response.json();

      // 5. Limpa o carrinho e atualiza o estado de pedidos em caso de sucesso.
      setCart([]);
      setOrders((prevOrders) => [newOrder, ...prevOrders]);

      return newOrder;
    } catch (error) {
      console.error("Erro em placeOrder:", error);
      // Re-lança o erro para que o 'catch' no componente da página o capture.
      throw error;
    }
  }, [cart, deliveryAddress, token]); // Dependências do useCallback, [cart, currentUser, deliveryAddress, token]);

  // ADICIONE ESTA NOVA FUNÇÃO (depois de 'placeOrder', ~linha 285)

  const handleUpdateAddress = async (
    addressId: number,
    // Usamos 'any' aqui para ignorar o types.ts (que espera Inglês)
    // O 'addressData' que chega aqui já está em Português (rua, bairro...)
    addressData: any
  ) => {
    if (!token) {
      console.error("Usuário não autenticado");
      return;
    }

    // NÃO HÁ TRADUÇÃO. Enviamos os dados em Português
    // que recebemos do formulário.
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/conta/enderecos/${addressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData), // Envia 'rua', 'bairro', etc.
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao atualizar endereço");
      }

      const updatedAddressApi = await response.json(); // API retorna Português

      // Atualiza o estado 'user' com o endereço modificado (em Português)
      setCurrentUser((prevUser) => {
        if (!prevUser) return null;

        const updatedAddresses = prevUser.addresses.map((addr: any) =>
          addr.id === addressId ? updatedAddressApi : addr
        );

        return { ...prevUser, addresses: updatedAddresses };
      });

      console.log("Endereço atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
    }
  };

  // Funções vazias para satisfazer o TypeScript e permitir a renderização do layout
  const createProduct = async (productData: any) => {
    // A FUNÇÃO AGORA TEM LÓGICA
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o produto.");
      }

      const newProduct = await response.json();
      // Adiciona o novo produto no estado global
      setProducts((prev) => [newProduct, ...prev]);
      alert("Produto criado com sucesso!");
      setRoute({ name: "adminManageProducts" }); // Redireciona para a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao criar produto.");
    }
  }; // LINHA ADICIONADA
  const updateProduct = async (productId: number, productData: any) => {
    // A FUNÇÃO AGORA TEM LÓGICA
    if (!token) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/produtos/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao atualizar o produto.");
      }

      const updatedProduct = await response.json();
      // Atualiza o produto no estado global
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      alert("Produto atualizado com sucesso!");
      setRoute({ name: "adminManageProducts" }); // Redireciona para a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto.");
    }
  };
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    // A FUNÇÃO AGORA TEM LÓGICA
    if (!token) return; // Verificação de segurança
    try {
      // 1. Faz a chamada à API para o endpoint que acabamos de criar
      const url = `${API_BASE_URL}/api/admin/pedidos/${orderId}/status?novoStatus=${newStatus}`; // LINHA CORRIGIDA

      const response = await fetch(url, {
        method: "PATCH", // O método continua sendo PATCH
        headers: {
          // NÃO precisamos mais de 'Content-Type', pois não há corpo na requisição
          Authorization: `Bearer ${token}`,
        },
        // NÃO há mais a propriedade 'body'
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o status do pedido.");
      }

      // 2. Recebe o pedido atualizado de volta da API
      const updatedOrder = await response.json();

      // 3. ATUALIZA O ESTADO GLOBAL: Esta é a linha que faz a mágica acontecer
      // Ela substitui o pedido antigo pelo novo no array 'orders'
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          String(o.id) === String(updatedOrder.id) ? updatedOrder : o
        )
      );
    } catch (error) {
      console.error(error);
      // O alert da página de detalhes já informa o sucesso, então só alertamos em caso de erro.
      alert("Erro ao atualizar o status do pedido.");
    }
  }; // LINHA ADICIONADA

  // ADICIONE ESTA IMPLEMENTAÇÃO COMPLETA E REVISADA

  const renderPage = () => {
    if (token && !currentUser && !isAdmin) {
      // 1. Aplicamos o mesmo padrão do catálogo: flexbox para centralizar
      return (
        <div className="flex flex-col items-center justify-center text-center p-10 h-96">
          {/* 2. Adicionamos o mesmo spinner com Tailwind */}
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          {/* 3. Trocamos o texto para algo mais adequado ao login */}
          <p className="mt-4 font-semibold text-title">
            Carregando seus dados...
          </p>
        </div>
      );
    }
    if (route.name === "adminLogin") {
      return (
        <AdminLoginPage
          setRoute={setRoute}
          handleAdminLogin={handleAdminLogin}
        />
      );
    }

    // ADICIONE TODO ESTE BLOCO NO LUGAR DO ANTERIOR
    if (token && isAdmin) {
      // O layout agora "envelopa" toda a lógica de renderização do admin // LINHA ADICIONADA
      return (
        // LINHA ADICIONADA
        <AdminLayout
          setRoute={setRoute}
          activeRoute={route.name}
          onLogout={onLogout}
        >
          {" "}
          {(() => {
            // LINHA ADICIONADA (Permite usar 'switch' dentro do JSX)
            switch (
              route.name // O 'switch' case original agora vive aqui dentro
            ) {
              case "adminManageProducts":
                return (
                  <AdminProductsPage products={products} setRoute={setRoute} />
                );
              case "adminProductForm":
                const productToEdit = products.find(
                  (p) => String(p.id) === String(route.id)
                );
                return (
                  <AdminProductFormPage
                    setRoute={setRoute}
                    product={productToEdit}
                    createProduct={createProduct}
                    updateProduct={updateProduct}
                  />
                );
              case "adminManageOrders":
                return <AdminOrdersPage orders={orders} setRoute={setRoute} />;
              // ADICIONE ESTE NOVO case COM O DIAGNÓSTICO
              case "adminOrderDetail":
                // As 3 linhas a seguir são para diagnóstico e podem ser removidas depois // LINHA ADICIONADA
                console.log("Procurando pelo orderId:", route.orderId); // LINHA ADICIONADA
                console.log("Tipo do orderId:", typeof route.orderId); // LINHA ADICIONADA
                console.log("Array de Pedidos 'orders':", orders); // LINHA ADICIONADA

                const orderToView = orders.find(
                  (o) => String(o.id) === String(route.orderId) // Garantimos que ambos os lados são strings
                );
                return orderToView ? (
                  <AdminOrderDetailPage
                    order={orderToView}
                    setRoute={setRoute}
                    updateOrderStatus={updateOrderStatus}
                  />
                ) : (
                  <p>Pedido não encontrado</p>
                );
              case "adminDashboard":
              default:
                // A página filha não precisa mais das props de navegação ou logout
                return (
                  <AdminDashboardPage orders={orders} products={products} />
                );
            }
          })()}
        </AdminLayout>
      );
    }

    if (!currentUser) {
      switch (route.name) {
        case "register":
          return <RegisterPage setRoute={setRoute} />;
        case "forgotPassword":
          return <ForgotPasswordPage setRoute={setRoute} />;
        default:
          return (
            <LoginPage
              setRoute={setRoute}
              onLoginSuccess={handleLoginSuccess}
            />
          );
      }
    }

    switch (route.name) {
      case "catalog":
        return <ProductCatalogPage setRoute={setRoute} addToCart={addToCart} />;
      case "productDetail":
        // A rota agora contém o objeto 'product' diretamente.
        // Não precisamos mais do .find()
        return (
          <ProductDetailPage
            product={route.product} // <-- Usamos o produto que veio da rota
            setRoute={setRoute}
            addToCart={addToCart}
          />
        );
        <p>Produto não encontrado</p>;
      case "cart":
        return (
          <CartPage
            cart={cart}
            setRoute={setRoute}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />
        );

      // ==================================================================
      // TRECHO 2 ATUALIZADO: Chamada do CheckoutAddressPage corrigida
      // ==================================================================
      case "deliveryAddress":
        return (
          <CheckoutAddressPage
            user={currentUser}
            setRoute={setRoute}
            addAddress={addAddress} // <<< AQUI! Passamos a referência da função correta
            updateAddress={handleUpdateAddress}
            deleteAddress={() => {}} // TODO: Implementar a lógica de deleção
            setDeliveryAddress={setDeliveryAddress}
            selectedAddress={deliveryAddress}
          />
        );

      case "payment":
        return (
          <CheckoutPaymentPage
            setRoute={setRoute}
            placeOrder={placeOrder}
            cart={cart}
            deliveryAddress={deliveryAddress}
          />
        );
      case "orderConfirmation":
        return (
          <CheckoutSuccessPage
            setRoute={setRoute}
            orderId={route.orderId}
            orders={orders}
          />
        );
      case "orderHistory":
        return <OrderHistoryPage orders={orders} setRoute={setRoute} />;

      case "orderTracking":
        // Esta rota também estava faltando
        return <OrderTrackingPage orderId={route.orderId} orders={orders} />;

      case "account":
        // Esta era a principal rota faltando
        return (
          <AccountPage
            user={currentUser}
            isAdmin={isAdmin}
            setRoute={setRoute}
            onLogout={onLogout}
          />
        );

      case "editProfile":
        return (
          <EditProfilePage
            user={currentUser}
            setRoute={setRoute}
            updateUser={() => {}}
          />
        );

      default:
        return <ProductCatalogPage setRoute={setRoute} addToCart={addToCart} />;
    }
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const showClientHeader = currentUser && !isAdmin;
  const showBottomNav = currentUser && !isAdmin;

  return (
    <div className="bg-background min-h-screen font-sans text-body-text">
      <div className="max-w-md mx-auto bg-background shadow-2xl min-h-screen flex flex-col">
        {/* ADICIONE '!isAdmin' AQUI: */}
        {showClientHeader && !isAdmin && (
          <MainHeader setRoute={setRoute} cartCount={cartCount} />
        )}

        <main
          className={`flex-grow overflow-y-auto no-scrollbar ${
            showBottomNav && !isAdmin ? "pb-16" : ""
          }`}
        >
          {renderPage()}
        </main>

        {/* E AQUI: */}
        {showBottomNav && !isAdmin && (
          <BottomNavBar
            setRoute={setRoute}
            activeRoute={route.name}
            cartCount={cartCount}
          />
        )}
      </div>
    </div>
  );
};

export default App;
