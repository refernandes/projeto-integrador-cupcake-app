// Local: /frontend/src/pages/checkout/CartPage.tsx

import React, { useMemo } from "react";
import type { CartItem, Route } from "../../types";
import { PlusIcon, MinusIcon, Trash2Icon } from "../../components/Icons";
import PrimaryButton from "../../components/ui/PrimaryButton";

interface CartPageProps {
  cart: CartItem[];
  setRoute: (route: Route) => void;
  updateCartQuantity: (cupcakeId: number, quantity: number) => void;
  removeFromCart: (cupcakeId: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cart,
  setRoute,
  updateCartQuantity,
  removeFromCart,
}) => {
  const subtotal = useMemo(
    () =>
      cart.reduce((acc, item) => acc + item.cupcake.price * item.quantity, 0),
    [cart]
  );
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-title mb-4">Meu Carrinho</h2>
        <p className="text-body-text mb-6">
          Parece que você ainda não adicionou nenhum cupcake delicioso.
        </p>
        <PrimaryButton
          onClick={() => setRoute({ name: "catalog" })}
          className="mt-6"
        >
          VER O CATÁLOGO
        </PrimaryButton>
      </div>
    );
  }
  // 1. NOVA FUNÇÃO: Adiciona a etapa de confirmação
  const handleRemoveClick = (cupcakeId: number, cupcakeName: string) => {
    // Mostra o pop-up de confirmação nativo do navegador
    if (
      window.confirm(
        `Tem certeza que deseja remover "${cupcakeName}" do carrinho?`
      )
    ) {
      // Só executa a remoção se o usuário clicar "OK"
      removeFromCart(cupcakeId);
    }
  };
  return (
    <div className="p-4 pb-48">
      <h2 className="text-2xl font-bold text-title mb-4">Meu Carrinho</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.cupcake.id}
            className="flex items-center bg-white p-3 rounded-lg shadow-sm"
          >
            <img
              src={item.cupcake.image}
              alt={item.cupcake.name}
              className="w-20 h-20 rounded-md object-cover"
            />
            <div className="flex-grow ml-4">
              <h3 className="font-bold text-body-text">{item.cupcake.name}</h3>
              <div className="flex items-center border rounded-full w-fit my-1">
                <button
                  onClick={() =>
                    handleRemoveClick(item.cupcake.id, item.cupcake.name)
                  }
                  className="p-2"
                >
                  <Trash2Icon className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </button>
                <span className="px-3 text-sm font-bold">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCartQuantity(item.cupcake.id, item.quantity + 1)
                  }
                  className="p-1 text-primary"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              <p className="font-bold text-primary">
                R${" "}
                {(item.cupcake.price * item.quantity)
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.cupcake.id)}
              className="p-2"
            >
              <Trash2Icon className="w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 space-y-2 max-w-md mx-auto shadow-top">
        <div className="flex justify-between text-body-text">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex justify-between text-body-text">
          <span>Taxa de entrega</span>
          <span>R$ {deliveryFee.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-title">
          <span>Total</span>
          <span>R$ {total.toFixed(2).replace(".", ",")}</span>
        </div>
        <PrimaryButton onClick={() => setRoute({ name: "deliveryAddress" })}>
          CONTINUAR PARA ENTREGA
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CartPage;
