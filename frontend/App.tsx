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

const API_BASE_URL = "http://localhost:8080";

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>({ name: "catalog" });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Cupcake[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const [profileResponse, addressResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/api/conta/perfil`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${API_BASE_URL}/api/conta/enderecos`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          if (!profileResponse.ok || !addressResponse.ok) {
            throw new Error("Sessão inválida ou expirada.");
          }

          const userData = await profileResponse.json();
          const addressData = await addressResponse.json();

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
        } catch (error) {
          console.error("Falha ao carregar dados do usuário:", error);
          onLogout();
        }
      };
      fetchUserData();
    } else {
      setRoute({ name: "login" });
    }
  }, [token]);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const onLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    setCart([]);
    setOrders([]);
    setRoute({ name: "login" });
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
      setOrders((prevOrders) => [...prevOrders, newOrder]);

      return newOrder;
    } catch (error) {
      console.error("Erro em placeOrder:", error);
      // Re-lança o erro para que o 'catch' no componente da página o capture.
      throw error;
    }
  }, [cart, deliveryAddress, token]); // Dependências do useCallback, [cart, currentUser, deliveryAddress, token]);

  const renderPage = () => {
    if (token && !currentUser) {
      return <div className="text-center p-10">Carregando...</div>;
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
        const product = products.find((p) => p.id === route.id);
        return product ? (
          <ProductDetailPage
            product={product}
            setRoute={setRoute}
            addToCart={addToCart}
          />
        ) : (
          <p>Produto não encontrado</p>
        );
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
        // Esta rota também estava faltando
        return (
          <EditProfilePage
            user={currentUser}
            setRoute={setRoute}
            // Precisamos adicionar a função de 'atualizar perfil' aqui depois
          />
        );
      // ... outras rotas ...

      default:
        // O 'default' continua sendo o catálogo
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
      <div className="max-w-md mx-auto bg-background shadow-2xl h-screen flex flex-col overflow-hidden">
        {showClientHeader && (
          <MainHeader setRoute={setRoute} cartCount={cartCount} />
        )}
        <main
          className={`flex-grow overflow-y-auto no-scrollbar ${
            showBottomNav ? "pb-16" : ""
          }`}
        >
          {renderPage()}
        </main>
        {showBottomNav && (
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
