import React from 'react';
import type { Route } from '../../types';
import Logo from '../../components/ui/Logo';
import PrimaryButton from '../../components/ui/PrimaryButton';
import InputField from '../../components/ui/InputField';

interface ForgotPasswordPageProps {
    setRoute: (route: Route) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ setRoute }) => (
    <div className="flex flex-col items-center min-h-full p-6">
        <Logo />
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center text-title">Recuperar Senha</h2>
            <p className="text-sm text-center text-body-text">Digite seu e-mail cadastrado e enviaremos um link para você criar uma nova senha.</p>
            <InputField id="email" label="E-mail" type="email" value="" onChange={() => {}}/>
            <PrimaryButton onClick={() => { alert('Link de recuperação enviado!'); setRoute({ name: 'login' })}}>ENVIAR LINK</PrimaryButton>
        </div>
    </div>
);

export default ForgotPasswordPage;
