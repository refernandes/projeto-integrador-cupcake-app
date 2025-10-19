import React from 'react';
import type { User, Route } from '../../types';
import { ChevronRightIcon, LogOutIcon } from '../../components/Icons';

interface AccountPageProps {
    user: User;
    isAdmin: boolean;
    setRoute: (route: Route) => void;
    onLogout: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ user, isAdmin, setRoute, onLogout }) => {
    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-title">Minha Conta</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-title">Meus Dados</h3>
                <p><span className="font-semibold">Nome:</span> {user.name}</p>
                <p><span className="font-semibold">E-mail:</span> {user.email}</p>
                <p><span className="font-semibold">Telefone:</span> {user.phone}</p>
                <button onClick={() => setRoute({ name: 'editProfile' })} className="text-primary font-semibold mt-2">Editar Dados</button>
            </div>
            <div className="bg-white rounded-lg shadow-sm divide-y">
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Funcionalidade indisponível') }} className="flex justify-between items-center p-4">
                    <span>Alterar Senha</span><ChevronRightIcon className="w-5 h-5"/>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ name: 'orderHistory' }) }} className="flex justify-between items-center p-4">
                    <span>Meus Pedidos</span><ChevronRightIcon className="w-5 h-5"/>
                </a>
                {isAdmin && (
                    <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ name: 'adminDashboard' }) }} className="flex justify-between items-center p-4">
                        <span className="font-bold text-primary">Painel do Administrador</span><ChevronRightIcon className="w-5 h-5 text-primary"/>
                    </a>
                )}
            </div>
            <button onClick={onLogout} className="w-full flex items-center justify-center bg-gray-200 text-body-text font-bold py-3 px-4 rounded-lg shadow-sm hover:bg-gray-300 transition-colors">
                <LogOutIcon className="w-5 h-5 mr-2" /> Sair
            </button>
        </div>
    );
};

export default AccountPage;
