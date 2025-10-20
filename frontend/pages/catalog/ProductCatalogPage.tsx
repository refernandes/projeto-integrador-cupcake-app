// Local: /frontend/src/pages/catalog/ProductCatalogPage.tsx

import React, { useState, useEffect, useMemo } from "react";
import type { Cupcake, Route } from "../../types"; // Mantemos seus tipos
import { SearchIcon } from "../../components/Icons";

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
  // ESTADOS DE CONTROLE:
  const [allProducts, setAllProducts] = useState<Cupcake[]>([]); // Guarda todos os produtos vindos da API
  const [loading, setLoading] = useState<boolean>(true); // Controla a mensagem de "Carregando..."
  const [error, setError] = useState<string | null>(null); // Guarda mensagens de erro

  // ESTADOS DE FILTRO (iguais aos que você já tinha):
  const [filter, setFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // 1. O CORAÇÃO DA INTEGRAÇÃO: useEffect para buscar os dados na API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Faz a chamada para o seu backend Java
        const response = await fetch("http://localhost:8080/api/produtos");

        if (!response.ok) {
          throw new Error("Falha na comunicação com o servidor.");
        }

        const dataFromApi: ProdutoAPI[] = await response.json();

        // 2. A MÁGICA DA ADAPTAÇÃO: Convertendo os dados da API para o formato que o seu front-end espera.
        // Isso resolve as diferenças de nomes (ex: 'nome' -> 'name', 'imagemUrl' -> 'image').
        const formattedProducts: Cupcake[] = dataFromApi.map((p) => ({
          id: p.id,
          name: p.nome,
          description: p.descricao,
          price: p.preco,
          image: p.imagemUrl,
          category: p.sabor,
          stock: p.estoque, // <--- ADICIONE ESTA LINHA
          active: true,
        }));

        setAllProducts(formattedProducts); // Guarda os produtos formatados no estado
      } catch (err: any) {
        setError(
          "Não foi possível carregar os cupcakes. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false); // Para de mostrar a mensagem de "Carregando..."
      }
    };

    fetchProducts(); // Executa a busca
  }, []); // O array vazio [] garante que a busca aconteça apenas uma vez, quando a página carrega.

  // 3. Os hooks 'useMemo' agora usam os dados dinâmicos do estado 'allProducts'
  const categories = useMemo(
    () => ["Todos", ...new Set(allProducts.map((c) => c.category))],
    [allProducts]
  );

  const filteredProducts = useMemo(
    () =>
      allProducts.filter(
        (p) =>
          (filter === "Todos" || p.category === filter) &&
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [allProducts, filter, searchTerm]
  );

  // --- RENDERIZAÇÃO CONDICIONAL (UX Melhorada) ---
  if (loading) {
    return (
      <div className="text-center p-10">
        Carregando nosso delicioso cardápio... 🧁
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

  // O SEU JSX ORIGINAL (sem alterações, pois agora ele recebe os dados corretos)
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

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4">
        {filteredProducts.map((cupcake) => (
          <div
            key={cupcake.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={cupcake.image}
              alt={cupcake.name}
              className="w-full h-32 object-cover cursor-pointer"
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
