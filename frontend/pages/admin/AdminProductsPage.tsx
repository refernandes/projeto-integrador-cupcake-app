import React from 'react';
import type { Cupcake, Route } from '../../types';

interface AdminProductsPageProps {
    products: Cupcake[];
    setRoute: (route: Route) => void;
}

const AdminProductsPage: React.FC<AdminProductsPageProps> = ({ products, setRoute }) => (
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-title">Gerenciar Produtos</h2>
            <button onClick={() => setRoute({ name: 'adminProductForm' })} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg text-sm">Adicionar Novo</button>
        </div>
        <div className="space-y-3">
            {products.map(p => (
                <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <img src={p.image} className="w-16 h-16 rounded-md object-cover"/>
                    <div className="flex-grow ml-3">
                        <p className="font-bold">{p.name}</p>
                        <p className="text-sm">R$ {p.price.toFixed(2)} | Estoque: {p.stock}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={p.active} className="sr-only peer" />
                            <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary-dark dark:peer-focus:ring-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                        <button onClick={() => setRoute({ name: 'adminProductForm', id: p.id })} className="text-sm text-primary font-semibold">Editar</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default AdminProductsPage;
