import React, { useState } from 'react';
import type { Cupcake, Route } from '../../types';
import { PlusIcon, MinusIcon } from '../../components/Icons';
import PrimaryButton from '../../components/ui/PrimaryButton';

interface ProductDetailPageProps {
    product: Cupcake;
    setRoute: (route: Route) => void;
    addToCart: (cupcake: Cupcake, quantity: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, setRoute, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    
    const handleAddToCart = () => {
        addToCart(product, quantity);
        setRoute({ name: 'cart' });
    }

    return (
        <div>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover"/>
            <div className="p-6 space-y-4">
                <h2 className="text-3xl font-serif text-title">{product.name}</h2>
                <p className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                <div className="flex items-center space-x-4">
                    <p className="font-bold">Quantidade:</p>
                    <div className="flex items-center border rounded-lg">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2"><MinusIcon className="w-5 h-5"/></button>
                        <span className="px-4 font-bold">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-2"><PlusIcon className="w-5 h-5"/></button>
                    </div>
                </div>
                <p className="text-body-text leading-relaxed">{product.description}</p>
                <PrimaryButton onClick={handleAddToCart}>ADICIONAR AO CARRINHO</PrimaryButton>
            </div>
        </div>
    );
};

export default ProductDetailPage;
