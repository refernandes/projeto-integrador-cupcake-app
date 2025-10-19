import React from 'react';
import type { Route } from '../../types';
import { MenuIcon, ShoppingCartIcon } from '../Icons';
import Logo from '../ui/Logo';

interface MainHeaderProps {
    setRoute: (route: Route) => void;
    cartCount: number;
}

const MainHeader: React.FC<MainHeaderProps> = ({ setRoute, cartCount }) => (
    <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 shadow-sm p-4 flex justify-between items-center">
        <button onClick={() => setRoute({ name: 'account' })}><MenuIcon className="w-6 h-6 text-title"/></button>
        <div onClick={() => setRoute({ name: 'catalog' })} className="cursor-pointer"><Logo /></div>
        <button onClick={() => setRoute({ name: 'cart' })} className="relative">
            <ShoppingCartIcon className="w-6 h-6 text-title"/>
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
        </button>
    </header>
);

export default MainHeader;
