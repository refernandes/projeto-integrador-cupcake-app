import React from 'react';
import type { Route } from '../../types';
import Logo from '../../components/ui/Logo';
import PrimaryButton from '../../components/ui/PrimaryButton';
import InputField from '../../components/ui/InputField';

interface RegisterPageProps {
    setRoute: (route: Route) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setRoute }) => (
    <div className="flex flex-col items-center min-h-full p-6">
        <Logo />
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center text-title">Crie sua Conta</h2>
            <InputField id="fullName" label="Nome Completo" value="" onChange={() => {}}/>
            <InputField id="email" label="E-mail" type="email" value="" onChange={() => {}}/>
            <InputField id="phone" label="Telefone" type="tel" value="" onChange={() => {}}/>
            <InputField id="password" label="Senha" type="password" value="" onChange={() => {}}/>
            <InputField id="confirmPassword" label="Confirmar Senha" type="password" value="" onChange={() => {}}/>
            <PrimaryButton onClick={() => setRoute({ name: 'login' })}>CADASTRAR</PrimaryButton>
            <div className="text-center text-sm">
                Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ name: 'login' }) }} className="font-bold text-primary hover:underline">Acesse</a>
            </div>
        </div>
    </div>
);

export default RegisterPage;
