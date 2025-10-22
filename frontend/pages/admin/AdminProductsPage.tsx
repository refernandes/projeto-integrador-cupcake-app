import React from "react";
import type { Cupcake, Route } from "../../types";

interface AdminProductsPageProps {
  products: Cupcake[];
  setRoute: (route: Route) => void;
  // A prop que faltava foi adicionada aqui // LINHA ADICIONADA
}

const AdminProductsPage: React.FC<AdminProductsPageProps> = ({
  products,
  setRoute,
}) => (
  <div className="p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-title">Gerenciar Produtos</h2>
      <button
        onClick={() => setRoute({ name: "adminProductForm" })}
        className="bg-primary text-white font-semibold px-4 py-2 rounded-lg text-sm"
      >
        Adicionar Novo
      </button>
    </div>
    <div className="space-y-3">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white p-3 rounded-lg shadow-sm flex items-center"
        >
          <img
            src={p.imagemUrl}
            className="w-16 h-16 rounded-md object-cover"
          />{" "}
          {/* LINHA CORRIGIDA */}
          <div className="flex-grow ml-3">
            <p className="font-bold">{p.nome}</p> {/* LINHA CORRIGIDA */}
            <p className="text-sm">
              R$ {p.preco.toFixed(2)} | Estoque: {p.estoque}
            </p>{" "}
            {/* LINHA CORRIGIDA */}
            {/* Mensagem condicional para estoque zero */}
            {p.estoque === 0 && ( // LINHA ADICIONADA
              <p className="text-xs text-red-500 font-semibold mt-1">
                Estoque zerado (Não visível para clientes)
              </p> // LINHA ADICIONADA
            )}{" "}
          </div>
          <div className="flex flex-col items-end space-y-1">
            <button
              onClick={() => setRoute({ name: "adminProductForm", id: p.id })}
              className="text-sm text-primary font-semibold"
            >
              Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminProductsPage;
