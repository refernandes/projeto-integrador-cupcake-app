import React, { useState, useMemo } from 'react';
import type { Cupcake, Route } from '../../types';
import { CUPCAKES } from '../../constants';
import { SearchIcon } from '../../components/Icons';

interface ProductCatalogPageProps {
    products: Cupcake[];
    setRoute: (route: Route) => void;
    addToCart: (cupcake: Cupcake) => void;
}

const ProductCatalogPage: React.FC<ProductCatalogPageProps> = ({ products, setRoute, addToCart }) => {
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    
    const categories = useMemo(() => ['Todos', ...new Set(CUPCAKES.map(c => c.category))], []);

    const filteredProducts = useMemo(() => 
        products.filter(p => 
            p.active &&
            (filter === 'Todos' || p.category === filter) &&
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), 
    [products, filter, searchTerm]);

    return (
        <div className="p-4 pt-2">
            <div className="relative mb-4">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Buscar cupcakes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white px-12 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            
            <h2 className="text-xl font-serif text-title mb-3">Sabores</h2>
            
            <div className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setFilter(cat)} 
                        className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                            filter === cat 
                            ? 'bg-primary text-white shadow' 
                            : 'bg-white text-body-text border border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4">
                {filteredProducts.map(cupcake => (
                    <div key={cupcake.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                        <img 
                            src={cupcake.image} 
                            alt={cupcake.name} 
                            className="w-full h-32 object-cover cursor-pointer" 
                            onClick={() => setRoute({ name: 'productDetail', id: cupcake.id })}
                        />
                        <div className="p-3 flex flex-col flex-grow">
                            <h3 className="font-bold text-base text-title flex-grow">{cupcake.name}</h3>
                            <p className="text-primary font-semibold mt-1 mb-3">R$ {cupcake.price.toFixed(2).replace('.', ',')}</p>
                            <button 
                                onClick={() => addToCart(cupcake)} 
                                className="mt-auto w-full text-sm font-bold py-2 px-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCatalogPage;
