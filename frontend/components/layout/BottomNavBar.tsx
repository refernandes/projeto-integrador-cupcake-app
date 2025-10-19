
import React from 'react';
import type { Route } from '../../types';
import { CatalogIcon, ShoppingBagIcon, ReceiptIcon, UserIcon, DashboardIcon, BoxIcon, ClipboardListIcon } from '../Icons';

interface BottomNavBarProps {
    setRoute: (route: Route) => void;
    activeRoute: Route['name'];
    cartCount: number;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ setRoute, activeRoute, cartCount }) => {
    const navItems = [
        { name: 'Catálogo', route: 'catalog', icon: CatalogIcon },
        { name: 'Carrinho', route: 'cart', icon: ShoppingBagIcon },
        { name: 'Pedidos', route: 'orderHistory', icon: ReceiptIcon },
        { name: 'Conta', route: 'account', icon: UserIcon },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.05)] z-20">
            <div className="flex justify-around h-16">
                {navItems.map(item => (
                    <button
                        key={item.name}
                        onClick={() => setRoute({ name: item.route as any })}
                        className={`flex flex-col items-center justify-center w-full text-xs font-medium transition-colors duration-200 ${
                            activeRoute === item.route ? 'text-primary' : 'text-gray-500 hover:text-primary'
                        }`}
                    >
                        <div className="relative">
                            <item.icon className="w-6 h-6 mb-1" />
                            {item.route === 'cart' && cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
                            )}
                        </div>
                        {item.name}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default BottomNavBar;

interface AdminBottomNavProps {
    setRoute: (route: Route) => void;
    activeRoute: Route['name'];
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({ setRoute, activeRoute }) => {
    const navItems = [
        { name: 'Dashboard', route: 'adminDashboard', icon: DashboardIcon },
        { name: 'Produtos', route: 'adminManageProducts', icon: BoxIcon },
        { name: 'Pedidos', route: 'adminManageOrders', icon: ClipboardListIcon },
    ];
    
    const getActiveRoute = () => {
        if (activeRoute === 'adminProductForm') return 'adminManageProducts';
        if (activeRoute === 'adminOrderDetail') return 'adminManageOrders';
        return activeRoute;
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.05)] z-20">
            <div className="flex justify-around h-16">
                {navItems.map(item => (
                    <button
                        key={item.name}
                        onClick={() => setRoute({ name: item.route as any })}
                        className={`flex flex-col items-center justify-center w-full text-xs font-medium transition-colors duration-200 ${
                            getActiveRoute() === item.route ? 'text-primary' : 'text-gray-500 hover:text-primary'
                        }`}
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        {item.name}
                    </button>
                ))}
            </div>
        </nav>
    );
};