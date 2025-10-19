import React, { useState } from 'react';
import type { User, Route } from '../../types';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { PencilIcon, Trash2Icon } from '../../components/Icons';

interface EditProfilePageProps {
    user: User;
    setRoute: (route: Route) => void;
    updateUser: (data: Partial<Omit<User, 'addresses'>>) => void;
    deleteAddress: (id: number) => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, setRoute, updateUser, deleteAddress }) => {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        if (newPassword && newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        // Em um app real, a senha seria tratada separadamente e com mais segurança.
        updateUser({ name, phone });
        alert('Dados salvos com sucesso!');
        setRoute({ name: 'account' });
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-title">Editar Dados</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                <InputField id="editName" label="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} />
                <div>
                    <label htmlFor="editEmail" className="block text-sm font-medium text-body-text mb-1">E-mail</label>
                    <input id="editEmail" name="editEmail" type="email" value={user.email} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
                </div>
                <InputField id="editPhone" label="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <InputField id="newPassword" label="Nova Senha (deixe em branco para não alterar)" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <InputField id="confirmPassword" label="Confirmar Nova Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-title mb-3">Meus Endereços</h3>
                <div className="space-y-3">
                    {user.addresses.map(address => (
                        <div key={address.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{address.street}, {address.number}</p>
                                <p className="text-sm text-gray-600">{address.neighborhood}, {address.city}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="text-primary p-1 rounded-full hover:bg-primary/10"><PencilIcon className="w-5 h-5"/></button>
                                <button onClick={() => deleteAddress(address.id)} className="text-red-500 p-1 rounded-full hover:bg-red-500/10"><Trash2Icon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    ))}
                     {user.addresses.length === 0 && <p className="text-sm text-gray-500 text-center py-2">Nenhum endereço cadastrado.</p>}
                </div>
                <button className="w-full text-primary font-semibold mt-4 p-2 rounded-lg border-2 border-dashed border-primary/50 hover:bg-primary/5">
                    + Adicionar Novo Endereço
                </button>
            </div>


            <PrimaryButton onClick={handleSave}>SALVAR ALTERAÇÕES</PrimaryButton>
            <button onClick={() => setRoute({ name: 'account' })} className="w-full text-center text-primary font-semibold mt-2">Cancelar</button>
        </div>
    );
};

export default EditProfilePage;