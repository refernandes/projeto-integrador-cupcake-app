// Local: /frontend/src/pages/admin/AdminLoginPage.tsx

import React, { useState } from "react"; // 1. Importe o 'useState'
import type { Route } from "../../types";
import Logo from "../../components/ui/Logo";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";

interface AdminLoginPageProps {
  setRoute: (route: Route) => void;
  // 2. A prop agora é específica para a função de login do admin
  handleAdminLogin: (loginData: { email: string; password: string }) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  setRoute,
  handleAdminLogin,
}) => {
  // 3. Criamos estados para controlar o e-mail e a senha
  const [email, setEmail] = useState("admin@cupcake.com");
  const [password, setPassword] = useState("admin123");

  // 4. Esta função monta o objeto de login e chama a prop
  const onLoginSubmit = () => {
    handleAdminLogin({ email, senha: password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <Logo />
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg mt-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-title">
          Acesso Administrativo
        </h2>

        {/* 5. Os campos agora estão conectados ao estado */}
        <InputField
          id="admin_email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="admin_password"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 6. O botão agora chama a nossa nova função de submit */}
        <PrimaryButton onClick={onLoginSubmit}>ACESSAR PAINEL</PrimaryButton>
      </div>
      {/* 7. Adicionamos um link para voltar para a loja do cliente */}
      <button
        onClick={() => setRoute({ name: "login" })}
        className="mt-4 text-sm text-primary font-semibold"
      >
        Voltar para a loja
      </button>
    </div>
  );
};

export default AdminLoginPage;
