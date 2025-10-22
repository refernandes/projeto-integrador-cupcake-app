import React, { useState } from "react";
import type { Route, User, Address } from "../../types";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { PencilIcon } from "../../components/Icons"; // Importa ícone se necessário

interface CheckoutAddressPageProps {
  user: User;
  setRoute: (route: Route) => void;
  addAddress: (newAddress: Omit<Address, "id">) => void;
  updateAddress: (id: number, data: Omit<Address, "id">) => void;
  deleteAddress: (id: number) => void;
  setDeliveryAddress: (address: Address) => void;
  selectedAddress: Address | null;
}

const CheckoutAddressPage: React.FC<CheckoutAddressPageProps> = ({
  user,
  setRoute,
  addAddress,
  updateAddress,
  deleteAddress,
  addressToEdit,
  setDeliveryAddress,
  selectedAddress,
}) => {
  const isEditing = !!addressToEdit;
  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Omit<Address, "id"> = {
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
    };
    addAddress(newAddress);
    setIsAdding(false);
    // Clear form
    setCep("");
    setStreet("");
    setNumber("");
    setComplement("");
    setNeighborhood("");
    setCity("");
  };

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
          />
          <InputField
            id="street"
            label="Rua"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="number"
              label="Número"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <InputField
              id="complement"
              label="Complemento"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>
          <InputField
            id="neighborhood"
            label="Bairro"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <InputField
            id="city"
            label="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <PrimaryButton type="submit">SALVAR E USAR ENDEREÇO</PrimaryButton>
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
          onClick={() => setRoute({ name: "payment" })}
          disabled={!selectedAddress}
        >
          IR PARA PAGAMENTO
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CheckoutAddressPage;
