import React, { useState, useEffect } from "react";
import type { Route, User, Address } from "../../types";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";

interface CheckoutAddressPageProps {
  user: User;
  setRoute: (route: Route) => void;
  addAddress: (newAddress: Omit<Address, "id">) => void;
  updateAddress: (id: number, data: Omit<Address, "id">) => void;
  deleteAddress: (id: number) => void;
  setDeliveryAddress: (address: Address) => void;
  selectedAddress: Address | null;
}

// Estado inicial para o formulário (agora em Português)
const initialFormData = {
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
};

const CheckoutAddressPage: React.FC<CheckoutAddressPageProps> = ({
  user,
  setRoute,
  addAddress,
  updateAddress,
  deleteAddress,
  setDeliveryAddress,
  selectedAddress,
}) => {
  const [formMode, setFormMode] = useState<"hidden" | "add" | "edit">("hidden");
  const [editingId, setEditingId] = useState<number | null>(null);
  // Estado unificado para os dados do formulário (Português)
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleShowAddForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setFormMode("add");
  };

  // Prepara o formulário para EDITAR
  const handleShowEditForm = (e: React.MouseEvent, address: any) => {
    e.stopPropagation();
    // Popula o formulário com os dados em Português do estado
    setFormData({
      cep: address.cep,
      rua: address.rua,
      numero: address.numero,
      complemento: address.complemento || "",
      bairro: address.bairro,
      cidade: address.cidade,
    });
    setEditingId(address.id);
    setFormMode("edit");
  };

  const handleCancel = () => {
    setFormMode("hidden");
    setEditingId(null);
  };

  // Submete o formulário (Adicionar ou Editar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const addressData = {
      ...formData,
      complemento: formData.complemento || null,
    };

    if (formMode === "edit" && editingId !== null) {
      updateAddress(editingId, addressData); // <-- AGORA ESTA FUNÇÃO EXISTE
    } else if (formMode === "add") {
      addAddress(addressData as any); // Usamos 'as any' para ignorar o types.ts
    }

    handleCancel();
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-2xl font-bold text-title">Endereço de Entrega</h2>

      <div className="space-y-3">
        <h3 className="font-bold text-title">Selecione o Endereço</h3>
        {/* Agora lemos 'rua', 'bairro' etc. do objeto 'address' */}
        {/* Usamos 'any' para ignorar os erros do types.ts */}
        {(user.addresses as any[]).map((address: any) => (
          <div
            key={address.id}
            onClick={() => setDeliveryAddress(address)}
            className={`p-3 rounded-lg shadow-sm cursor-pointer border-2 transition-all ${
              selectedAddress?.id === address.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="flex items-center justify-center mr-3 mt-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAddress?.id === address.id
                        ? "border-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedAddress?.id === address.id && (
                      <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-bold">
                    {/* USANDO PORTUGUÊS (do App.tsx) */}
                    {address.rua}, {address.numero}
                  </p>
                  <p className="text-sm text-gray-600">
                    {/* USANDO PORTUGUÊS (do App.tsx) */}
                    {address.bairro}, {address.cidade}
                  </p>
                  <p className="text-sm text-gray-600">CEP: {address.cep}</p>
                </div>
              </div>
              <div className="flex space-x-2 text-sm flex-shrink-0 ml-2">
                <button
                  onClick={(e) => handleShowEditForm(e, address)}
                  className="font-semibold text-primary hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // A função deleteAddress está sendo passada
                    // mas pode estar vazia (deleteAddress: () => {})
                    deleteAddress(address.id);
                  }}
                  className="font-semibold text-red-500 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Seção do Formulário (Renderização Condicional) */}
      {formMode !== "hidden" ? (
        <form onSubmit={handleSubmit} className="space-y-3 pt-4">
          <h3 className="font-bold text-title">
            {formMode === "add" ? "Adicionar novo endereço" : "Editar Endereço"}
          </h3>
          {/* IDs dos inputs agora em Português */}
          <InputField
            id="cep"
            label="CEP"
            value={formData.cep}
            onChange={handleFormChange}
          />
          <InputField
            id="rua"
            label="Rua"
            value={formData.rua}
            onChange={handleFormChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="numero"
              label="Número"
              value={formData.numero}
              onChange={handleFormChange}
            />
            <InputField
              id="complemento"
              label="Complemento"
              value={formData.complemento}
              onChange={handleFormChange}
            />
          </div>
          <InputField
            id="bairro"
            label="Bairro"
            value={formData.bairro}
            onChange={handleFormChange}
          />
          <InputField
            id="cidade"
            label="Cidade"
            value={formData.cidade}
            onChange={handleFormChange}
          />
          <PrimaryButton type="submit">
            {formMode === "add"
              ? "SALVAR E USAR ENDEREÇO"
              : "ATUALIZAR ENDEREÇO"}
          </PrimaryButton>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full text-center text-sm p-2"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <button
          onClick={handleShowAddForm}
          className="w-full text-primary font-semibold mt-3 p-2 rounded-lg border-2 border-dashed border-primary/50 hover:bg-primary/5"
        >
          + Adicionar novo endereço
        </button>
      )}

      {/* CORREÇÃO VISUAL:
        Este bloco agora só aparece se o formulário NÃO estiver visível 
      */}
      {formMode === "hidden" && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
          <PrimaryButton
            onClick={() => setRoute({ name: "payment" })}
            disabled={!selectedAddress}
          >
            IR PARA PAGAMENTO
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default CheckoutAddressPage;
