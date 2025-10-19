import React from 'react';
import type { Cupcake, Route } from '../../types';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';

interface AdminProductFormPageProps {
    setRoute: (route: Route) => void;
    product?: Cupcake;
}

const AdminProductFormPage: React.FC<AdminProductFormPageProps> = ({ setRoute, product }) => (
    <div className="p-4">
        <h2 className="text-2xl font-bold text-title mb-4">{product ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <InputField id="prodName" label="Nome do Produto" value={product?.name || ''} onChange={() => {}}/>
            <div>
                <label htmlFor="prodDesc" className="block text-sm font-medium text-body-text mb-1">Descrição</label>
                <textarea id="prodDesc" rows={4} defaultValue={product?.description || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField id="prodPrice" label="Preço" type="number" value={String(product?.price || '')} onChange={() => {}}/>
                <InputField id="prodStock" label="Estoque" type="number" value={String(product?.stock || '')} onChange={() => {}}/>
            </div>
            <div>
                <label htmlFor="prodCategory" className="block text-sm font-medium text-body-text mb-1">Categoria/Sabor</label>
                <select id="prodCategory" defaultValue={product?.category || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Chocolate</option><option>Morango</option><option>Baunilha</option><option>Frutas</option>
                </select>
            </div>
             <div>
                <label htmlFor="prodImage" className="block text-sm font-medium text-body-text mb-1">Upload de Imagem</label>
                <input type="file" id="prodImage" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
            </div>
            <PrimaryButton onClick={() => setRoute({ name: 'adminManageProducts' })}>SALVAR</PrimaryButton>
        </div>
    </div>
);

export default AdminProductFormPage;
