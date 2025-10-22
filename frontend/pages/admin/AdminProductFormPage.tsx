import React, { useState, useEffect } from "react"; // LINHAS MODIFICADAS (importa hooks)
import type { Cupcake, Route } from "../../types";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";

interface AdminProductFormPageProps {
  setRoute: (route: Route) => void;
  product?: Cupcake;
  createProduct: (data: any) => void; // LINHA ADICIONADA (vem do App.tsx)
  updateProduct: (id: number, data: any) => void; // LINHA ADICIONADA (vem do App.tsx)
}

const AdminProductFormPage: React.FC<AdminProductFormPageProps> = ({
  setRoute,
  product,
  createProduct, // LINHA ADICIONADA
  updateProduct, // LINHA ADICIONADA
}) => {
  // LINHA ADICIONADA: Estado para controlar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    estoque: 0,
    sabor: "Chocolate", // 'sabor' é o nome do campo no seu DTO de back-end
    imagemUrl: "https://via.placeholder.com/300", // Um placeholder padrão
  });

  // LINHA ADICIONADA: Efeito para popular o formulário se estivermos editando um produto
  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco,
        estoque: product.estoque,
        sabor: product.sabor, // Usa 'sabor' (corrigido do seu DLoop 'category')
        imagemUrl: product.imagemUrl,
      });
    }
  }, [product]);

  // LINHA ADICIONADA: Função única para lidar com a mudança em TODOS os campos
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // LINHA ADICIONADA: Função para lidar com o envio do formulário
  const handleSave = () => {
    console.log("Botão SALVAR clicado! Iniciando handleSave...");
    // Prepara os dados para enviar à API (convertendo números)
    const payload = {
      ...formData,
      preco: Number(formData.preco),
      estoque: Number(formData.estoque),
    };

    if (product && product.id) {
      // Modo Edição: chama a função de update
      updateProduct(product.id, payload);
    } else {
      // Modo Criação: chama a função de create
      createProduct(payload);
    }
  };

  return (
    // O div principal agora é um <form> que usa handleSubmit
    <form className="p-4" onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-2xl font-bold text-title mb-4">
        {product ? "Editar Produto" : "Cadastrar Novo Produto"}
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        {/* Os campos agora usam 'id', 'value' e 'onChange' padronizados */}
        <InputField
          id="nome"
          label="Nome do Produto"
          value={formData.nome}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-body-text mb-1"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            rows={4}
            value={formData.descricao}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="preco"
            label="Preço"
            type="number"
            value={formData.preco}
            onChange={handleChange}
          />
          <InputField
            id="estoque"
            label="Estoque"
            type="number"
            value={formData.estoque}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="sabor"
            className="block text-sm font-medium text-body-text mb-1"
          >
            Categoria/Sabor
          </label>
          <select
            id="sabor"
            value={formData.sabor}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg..."
          >
            <option>Chocolate</option>
            <option>Morango</option>
            <option>Baunilha</option>
            <option>Frutas</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="imagemUrl"
            className="block text-sm font-medium text-body-text mb-1"
          >
            URL da Imagem
          </label>
          <InputField
            id="imagemUrl"
            label=""
            value={formData.imagemUrl}
            onChange={handleChange}
          />
          {/* Nota: Um <input type="file"> real exigiria um backend de upload de arquivos. Manter como URL é mais simples. */}
        </div>

        {/* O botão agora é do tipo "submit" e não tem mais onClick */}
        <PrimaryButton onClick={handleSave}>SALVAR</PrimaryButton>
      </div>
    </form>
  );
};

export default AdminProductFormPage;
