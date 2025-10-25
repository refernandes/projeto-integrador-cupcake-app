// Local: /frontend/src/pages/catalog/ProductCatalogPage.tsx

import React, { useState, useEffect, useMemo } from "react";
import type { Cupcake, Route } from "../../types"; // Mantemos seus tipos
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

// O componente agora só precisa das funções de navegação e do carrinho,
// pois ele mesmo vai buscar os produtos.
interface ProductCatalogPageProps {
  setRoute: (route: Route) => void;
  addToCart: (cupcake: Cupcake) => void;
}

const ProductCatalogPage: React.FC<ProductCatalogPageProps> = ({
  setRoute,
  addToCart,
}) => {
  // --- NOSSOS 4 ESTADOS DE CONTROLE ---
  const [allProducts, setAllProducts] = useState<Cupcake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // (SP3.2) Feedback de Adicionar
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  // --- NOSSOS 3 ESTADOS DE FILTRO/ORDEM ---
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  // (SP3.5) Ordenação
  const [sortBy, setSortBy] = useState("default");

  // ... (useEffect para buscar produtos - NENHUMA MUDANÇA AQUI) ...
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

  // (SP3.2) Função de Feedback - NENHUMA MUDANÇA AQUI
  const handleAddToCartClick = (cupcake: Cupcake) => {
    if (addingProductId === cupcake.id) return;
    setAddingProductId(cupcake.id);
    addToCart(cupcake);
    setTimeout(() => {
      setAddingProductId(null);
    }, 1500);
  };

  // --- O CÓDIGO PROBLEMÁTICO (AGORA CORRIGIDO) ---
  const categories = useMemo(
    () => ["Todos", ...new Set(allProducts.map((c) => c.category))],
    [allProducts]
  );

  // ESTE É O NOVO useMemo CORRETO (SP3.5 + Filtros)
  const filteredProducts = useMemo(
    () => {
      // 1. Lógica de FILTRO original
      const filtered = allProducts.filter(
        (p) =>
          p.stock > 0 &&
          (filter === "Todos" || p.category === filter) &&
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // 2. Lógica de ORDENAÇÃO nova
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
    },
    [allProducts, filter, searchTerm, sortBy] // O array de dependências CORRETO
  );

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // (SP3.1) Spinner de Loading
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
    // ... (bloco de erro)
  }

  // --- O JSX FINAL ---
  return (
    <div className="p-4 pt-2">
      {/* ... (Barra de Busca) ... */}
      <div className="relative mb-4">{/* ... */}</div>

      <h2 className="text-xl font-serif text-title mb-3">Sabores</h2>
      {/* ... (Botões de Categoria) ... */}
      <div className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
        {/* ... */}
      </div>

      {/* (SP3.5) Dropdown de Ordenação */}
      <div className="mt-4">
        <label
          htmlFor="sort-by"
          className="text-sm font-semibold text-gray-700 mr-2"
        >
          Ordenar por:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="default">Padrão</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
        </select>
      </div>

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
