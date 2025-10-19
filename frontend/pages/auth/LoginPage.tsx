import React, { useState } from 'react';
import type { Route } from '../../types';
import { EyeIcon, EyeOffIcon } from '../../components/Icons';
import Logo from '../../components/ui/Logo';
import PrimaryButton from '../../components/ui/PrimaryButton';
import InputField from '../../components/ui/InputField';

interface LoginPageProps {
    setRoute: (route: Route) => void;
    onLogin: (isAdmin: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setRoute, onLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center min-h-full p-6">
            <Logo />
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg mt-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-title">Entrar</h2>
                <InputField id="email" label="Nome de usuário ou e-mail" value="ana.silva@example.com" onChange={() => {}} />
                <div className="relative">
                    <InputField id="password" label="Senha" type={showPassword ? 'text' : 'password'} value="123456" onChange={() => {}} />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500">
                        {showPassword ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                    </button>
                </div>
                <PrimaryButton onClick={() => onLogin(false)}>ACESSAR</PrimaryButton>
                <div className="text-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ name: 'forgotPassword' }) }} className="text-sm text-primary hover:underline">Perdeu sua senha?</a>
                </div>
                <div className="text-center text-sm text-body-text">
                    Ainda não tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ name: 'register' }) }} className="font-bold text-primary hover:underline">Cadastre-se</a>
                    <br />
                    <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ name: 'adminLogin' }) }} className="text-gray-500 hover:underline mt-2 inline-block">Acessar como Administrador</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;