// Local: /frontend/src/pages/catalog/ProductCatalogPage.tsx

import React, { useState, useEffect, useMemo } from "react";
import type { Cupcake, Route } from "../../types";
import { SearchIcon } from "../../components/Icons";
import { API_BASE_URL } from "../../src/apiConfig";

// Interface para os dados que vêm DIRETAMENTE da sua API Java (ProdutoResponseDTO)
interface ProdutoAPI {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  sabor: string;
  imagemUrl: string;
  estoque: number;
}

interface ProductCatalogPageProps {
  setRoute: (route: Route) => void;
  addToCart: (cupcake: Cupcake) => void;
}

const ProductCatalogPage: React.FC<ProductCatalogPageProps> = ({
  setRoute,
  addToCart,
}) => {
  // --- ESTADOS DE CONTROLE ---
  const [allProducts, setAllProducts] = useState<Cupcake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // (SP3.2) Feedback de Adicionar
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  // --- ESTADOS DE FILTRO/ORDEM ---
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  // (SP3.5) Ordenação
  const [sortBy, setSortBy] = useState("default");

  // ... useEffect para buscar produtos (NENHUMA MUDANÇA) ...
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/produtos`);
        if (!response.ok) {
          throw new Error("Falha na comunicação com o servidor.");
        }
        const dataFromApi: ProdutoAPI[] = await response.json();
        const formattedProducts: Cupcake[] = dataFromApi.map((p) => ({
          id: p.id,
          name: p.nome,
          description: p.descricao,
          price: p.preco,
          image: p.imagemUrl,
          category: p.sabor,
          stock: p.estoque,
          active: true,
        }));
        setAllProducts(formattedProducts);
      } catch (err: any) {
        setError(
          "Não foi possível carregar os cupcakes. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // (SP3.2) Função de Feedback (NENHUMA MUDANÇA)
  const handleAddToCartClick = (cupcake: Cupcake) => {
    if (addingProductId === cupcake.id) return;
    setAddingProductId(cupcake.id);
    addToCart(cupcake);
    setTimeout(() => {
      setAddingProductId(null);
    }, 1500);
  };

  // --- useMemos para FILTRAR e ORDENAR ---
  const categories = useMemo(
    () => ["Todos", ...new Set(allProducts.map((c) => c.category))],
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter(
      (p) =>
        p.stock > 0 &&
        (filter === "Todos" || p.category === filter) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "name-asc":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  }, [allProducts, filter, searchTerm, sortBy]);

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // (SP3.1) Spinner de Loading (NENHUMA MUDANÇA)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 h-96">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 font-semibold text-title">
          Carregando nosso delicioso cardápio... 🧁
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600">
        <strong>Oops!</strong> {error}
      </div>
    );
  }

  // --- O JSX FINAL ---
  return (
    <div className="p-4 pt-2">
      {/* Barra de Busca */}
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

      <div className="flex justify-between items-center mt-4">
        {/* Título "Sabores" */}
        <h2 className="text-xl font-serif text-title">Sabores</h2>

        {/* (SP3.5) Dropdown de Ordenação (AGORA ESTILIZADO) */}
        <div className="relative">
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              appearance-none 
              bg-white 
              border border-gray-200 
              rounded-lg 
              px-4 py-2 
              text-sm 
              font-semibold 
              text-body-text 
              focus:outline-none 
              focus:ring-2 
              focus:ring-primary
              pr-8 
            "
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="name-asc">Nome (A-Z)</option>
            <option value="name-desc">Nome (Z-A)</option>
          </select>
          {/* Seta customizada */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* (FIX) Botões de Categoria (O CÓDIGO QUE SUMIU ESTÁ DE VOLTA) */}
      <div className="flex space-x-3 overflow-x-auto py-3 -mx-4 px-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
              filter === cat
                ? "bg-primary text-white shadow"
                : "bg-white text-body-text border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Produtos (com o feedback SP3.2) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4">
        {filteredProducts.map((cupcake) => (
          <div
            key={cupcake.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={cupcake.image}
              alt={cupcake.name}
              className="w-full aspect-square object-cover cursor-pointer"
              onClick={() =>
                setRoute({ name: "productDetail", product: cupcake })
              }
            />
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="font-bold text-base text-title flex-grow">
                {cupcake.name}
              </h3>
              <p className="text-primary font-semibold mt-1 mb-3">
                R$ {cupcake.price.toFixed(2).replace(".", ",")}
              </p>
              {/* (SP3.2) Botão com Feedback */}
              <button
                onClick={() => handleAddToCartClick(cupcake)}
                disabled={addingProductId === cupcake.id}
                className={`
                  mt-auto w-full text-sm font-bold py-2 px-2 rounded-lg text-white transition-colors
                  ${
                    addingProductId === cupcake.id
                      ? "bg-green-500" // Cor de sucesso
                      : "bg-primary hover:bg-primary-dark" // Cor padrão
                  }
                `}
              >
                {addingProductId === cupcake.id ? "Adicionado!" : "Adicionar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogPage;
