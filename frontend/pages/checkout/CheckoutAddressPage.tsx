// Local: /frontend/src/pages/checkout/CheckoutAddressPage.tsx

import React, { useState } from "react";
import type { Route, User, Address } from "../../types";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";

interface CheckoutAddressPageProps {
  user: User;
  setRoute: (route: Route) => void;
  // 1. ATUALIZAÇÃO DA PROP: A função 'addAddress' agora é uma Promise.
  addAddress: (newAddress: Omit<Address, "id">) => Promise<void>;
  deleteAddress: (id: number) => void;
  setDeliveryAddress: (address: Address) => void;
  selectedAddress: Address | null;
}

const CheckoutAddressPage: React.FC<CheckoutAddressPageProps> = ({
  user,
  setRoute,
  addAddress,
  deleteAddress,
  setDeliveryAddress,
  selectedAddress,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  // 2. ATUALIZAÇÃO DOS ESTADOS: Renomeados para corresponder à API Java (rua, bairro, etc.)
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  // Novos estados para feedback de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3. ATUALIZAÇÃO DA LÓGICA: A função agora é assíncrona e envia os dados corretos.
  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Monta o objeto com os nomes de campo que a API Java espera
    const newAddressData = { cep, rua, numero, complemento, bairro, cidade };

    try {
      // Chama a função assíncrona do App.tsx e espera a conclusão
      await addAddress(newAddressData);

      setIsAdding(false);
      // Limpa o formulário apenas em caso de sucesso
      setCep("");
      setRua("");
      setNumero("");
      setComplemento("");
      setBairro("");
      setCidade("");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao salvar o endereço.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToPayment = () => {
    if (!selectedAddress) {
      alert("Por favor, selecione ou cadastre um endereço de entrega.");
      return;
    }
    setRoute({ name: "payment" });
  };

  // 4. ATUALIZAÇÃO DO JSX: Conectado aos novos estados e lógica.
  return (
    <div className="p-4 space-y-4 pb-24">
      <h2 className="text-2xl font-bold text-title">Endereço de Entrega</h2>

      <div className="space-y-3">
        <h3 className="font-bold text-title">Selecione o Endereço</h3>
        {user.addresses.map((address) => (
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
                  {/* Exibe os campos corretos (rua, bairro, etc.) */}
                  <p className="font-bold">
                    {address.rua}, {address.numero}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.bairro}, {address.cidade}
                  </p>
                  <p className="text-sm text-gray-600">CEP: {address.cep}</p>
                </div>
              </div>
              <div className="flex space-x-2 text-sm flex-shrink-0 ml-2">
                <button className="font-semibold text-primary hover:underline">
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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

      {isAdding ? (
        <form onSubmit={handleAddNewAddress} className="space-y-3 pt-4">
          <h3 className="font-bold text-title">Adicionar novo endereço</h3>
          <InputField
            id="cep"
            label="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
          <InputField
            id="rua"
            label="Rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="numero"
              label="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
            <InputField
              id="complemento"
              label="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
          <InputField
            id="bairro"
            label="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
          />
          <InputField
            id="cidade"
            label="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />

          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Salvando..." : "SALVAR E USAR ENDEREÇO"}
          </PrimaryButton>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="w-full text-center text-sm p-2"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full text-primary font-semibold mt-3 p-2 rounded-lg border-2 border-dashed border-primary/50 hover:bg-primary/5"
        >
          + Adicionar novo endereço
        </button>
      )}

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
        <PrimaryButton
          onClick={handleContinueToPayment}
          disabled={!selectedAddress}
        >
          IR PARA PAGAMENTO
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CheckoutAddressPage;
