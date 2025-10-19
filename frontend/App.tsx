
import React, { useState, useMemo, useCallback } from 'react';
import type { Cupcake, CartItem, User, Order, Address, Route } from './types';
import { OrderStatus } from './types';
import { CUPCAKES, MOCK_USER, MOCK_ORDERS } from './constants';

// Layout Components
import MainHeader from './components/layout/MainHeader';
import AdminHeader from './components/layout/AdminHeader';
import BottomNavBar, { AdminBottomNav } from './components/layout/BottomNavBar';

// Page Components
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ProductCatalogPage from './pages/catalog/ProductCatalogPage';
import ProductDetailPage from './pages/catalog/ProductDetailPage';
import CartPage from './pages/checkout/CartPage';
import CheckoutAddressPage from './pages/checkout/CheckoutAddressPage';
import CheckoutPaymentPage from './pages/checkout/CheckoutPaymentPage';
import CheckoutSuccessPage from './pages/checkout/CheckoutSuccessPage';
import OrderTrackingPage from './pages/account/OrderTrackingPage';
import AccountPage from './pages/account/AccountPage';
import EditProfilePage from './pages/account/EditProfilePage';
import OrderHistoryPage from './pages/account/OrderHistoryPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';

// Main App Component
const App: React.FC = () => {
    const [route, setRoute] = useState<Route>({ name: 'login' });
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Cupcake[]>(CUPCAKES);
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);

    const onLogin = (admin = false) => {
        setCurrentUser(MOCK_USER);
        setIsAdmin(admin);
        if (!admin && MOCK_USER.addresses.length > 0) {
            setDeliveryAddress(MOCK_USER.addresses[0]);
        }
        setRoute(admin ? { name: 'adminDashboard' } : { name: 'catalog' });
    };

    const onLogout = () => {
        setCurrentUser(null);
        setIsAdmin(false);
        setCart([]);
        setDeliveryAddress(null);
        setRoute({ name: 'login' });
    };

    const addToCart = useCallback((cupcake: Cupcake, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.cupcake.id === cupcake.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.cupcake.id === cupcake.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { cupcake, quantity }];
        });
        alert(`${cupcake.name} adicionado ao carrinho!`);
    }, []);

    const updateCartQuantity = useCallback((cupcakeId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(cupcakeId);
            return;
        }
        setCart(prevCart => prevCart.map(item =>
            item.cupcake.id === cupcakeId ? { ...item, quantity } : item
        ));
    }, []);

    const removeFromCart = useCallback((cupcakeId: number) => {
        setCart(prevCart => prevCart.filter(item => item.cupcake.id !== cupcakeId));
    }, []);

    const updateUser = (updatedData: Partial<Omit<User, 'addresses'>>) => {
        setCurrentUser(prev => prev ? { ...prev, ...updatedData } : null);
    };

    const addAddress = (newAddressData: Omit<Address, 'id'>) => {
      setCurrentUser(prevUser => {
        if (!prevUser) return null;
        const newAddress: Address = {
          ...newAddressData,
          id: Date.now(),
        };
        const updatedAddresses = [...prevUser.addresses, newAddress];
        setDeliveryAddress(newAddress);
        return { ...prevUser, addresses: updatedAddresses };
      });
    };

    const deleteAddress = (addressId: number) => {
        setCurrentUser(prevUser => {
            if (!prevUser) return null;
            const updatedAddresses = prevUser.addresses.filter(addr => addr.id !== addressId);
            if (deliveryAddress?.id === addressId) {
                setDeliveryAddress(updatedAddresses[0] || null);
            }
            return { ...prevUser, addresses: updatedAddresses };
        });
    };

    const placeOrder = useCallback(() => {
        if (!deliveryAddress) {
            alert("Por favor, selecione um endereço de entrega.");
            return null;
        }
        const subtotal = cart.reduce((acc, item) => acc + item.cupcake.price * item.quantity, 0);
        const newOrder: Order = {
            id: `#${Math.floor(Math.random() * 9000) + 1000}`,
            date: new Date().toLocaleDateString('pt-BR'),
            items: [...cart],
            total: subtotal + 5.00, // + taxa de entrega
            status: OrderStatus.Confirmed,
            user: currentUser!,
            address: deliveryAddress,
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        return newOrder;
    }, [cart, currentUser, deliveryAddress]);

    const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    const renderPage = () => {
        switch (route.name) {
            case 'login': return <LoginPage setRoute={setRoute} onLogin={onLogin} />;
            case 'register': return <RegisterPage setRoute={setRoute} />;
            case 'forgotPassword': return <ForgotPasswordPage setRoute={setRoute} />;
            case 'catalog': return <ProductCatalogPage products={products} setRoute={setRoute} addToCart={addToCart} />;
            case 'productDetail':
                const product = products.find(p => p.id === route.id);
                return product ? <ProductDetailPage product={product} setRoute={setRoute} addToCart={addToCart} /> : <p>Produto não encontrado</p>;
            case 'cart': return <CartPage cart={cart} setRoute={setRoute} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />;
            case 'deliveryAddress': return currentUser ? <CheckoutAddressPage user={currentUser} setRoute={setRoute} addAddress={addAddress} deleteAddress={deleteAddress} setDeliveryAddress={setDeliveryAddress} selectedAddress={deliveryAddress} /> : null;
            case 'payment': return <CheckoutPaymentPage setRoute={setRoute} placeOrder={placeOrder} cart={cart} deliveryAddress={deliveryAddress} />;
            case 'orderConfirmation': return <CheckoutSuccessPage setRoute={setRoute} orderId={route.orderId} orders={orders} />;
            case 'orderTracking': return <OrderTrackingPage orderId={route.orderId} orders={orders} />;
            case 'account': return currentUser ? <AccountPage user={currentUser} isAdmin={isAdmin} setRoute={setRoute} onLogout={onLogout} /> : <LoginPage setRoute={setRoute} onLogin={onLogin} />;
            case 'editProfile': return currentUser ? <EditProfilePage user={currentUser} setRoute={setRoute} updateUser={updateUser} deleteAddress={deleteAddress} /> : <LoginPage setRoute={setRoute} onLogin={onLogin} />;
            case 'orderHistory': return <OrderHistoryPage orders={orders.filter(o => o.user.id === currentUser?.id)} setRoute={setRoute} />;
            case 'adminLogin': return <AdminLoginPage setRoute={setRoute} onLogin={onLogin} />;
            case 'adminDashboard': return <AdminDashboardPage setRoute={setRoute} orders={orders} products={products} />;
            case 'adminManageProducts': return <AdminProductsPage products={products} setRoute={setRoute} />;
            case 'adminProductForm':
                const productToEdit = products.find(p => p.id === route.id);
                return <AdminProductFormPage setRoute={setRoute} product={productToEdit} />;
            case 'adminManageOrders': return <AdminOrdersPage orders={orders} setRoute={setRoute} />;
            case 'adminOrderDetail':
                const orderToView = orders.find(o => o.id === route.orderId);
                return orderToView ? <AdminOrderDetailPage order={orderToView} setRoute={setRoute} updateOrderStatus={updateOrderStatus} /> : <p>Pedido não encontrado</p>;
            default: return <LoginPage setRoute={setRoute} onLogin={onLogin} />;
        }
    };
    
    const showClientHeader = currentUser && !isAdmin && !['login', 'register', 'forgotPassword', 'adminLogin'].includes(route.name);
    const showAdminHeader = currentUser && isAdmin;
    const showBottomNav = currentUser && !isAdmin && !['login', 'register', 'forgotPassword', 'adminLogin', 'adminDashboard', 'adminManageProducts', 'adminProductForm', 'adminManageOrders'].includes(route.name);
    const showAdminBottomNav = currentUser && isAdmin;

    if (route.name === 'adminLogin' && !isAdmin) return <AdminLoginPage setRoute={setRoute} onLogin={onLogin} />;

    return (
        <div className="bg-background min-h-screen font-sans text-body-text">
            <div className="max-w-md mx-auto bg-background shadow-2xl h-screen flex flex-col overflow-hidden">
                {showClientHeader && <MainHeader setRoute={setRoute} cartCount={cartCount} />}
                {showAdminHeader && <AdminHeader onLogout={onLogout} />}
                <main className={`flex-grow overflow-y-auto no-scrollbar ${showBottomNav || showAdminBottomNav ? 'pb-16' : ''}`}>
                    {renderPage()}
                </main>
                {showBottomNav && <BottomNavBar setRoute={setRoute} activeRoute={route.name} cartCount={cartCount} />}
                {showAdminBottomNav && <AdminBottomNav setRoute={setRoute} activeRoute={route.name} />}
            </div>
        </div>
    );
};

export default App;