import React from 'react';
import type { Route } from '../../types';
import Logo from '../../components/ui/Logo';
import InputField from '../../components/ui/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';

interface AdminLoginPageProps {
    setRoute: (route: Route) => void;
    onLogin: (isAdmin: boolean) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ setRoute, onLogin }) => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <Logo />
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-title">Acesso Administrativo</h2>
            <InputField id="admin_email" label="E-mail" value="admin@cupcake.com" onChange={() => {}}/>
            <InputField id="admin_password" label="Senha" type="password" value="admin123" onChange={() => {}}/>
            <PrimaryButton onClick={() => onLogin(true)}>ACESSAR PAINEL</PrimaryButton>
        </div>
    </div>
);

export default AdminLoginPage;
