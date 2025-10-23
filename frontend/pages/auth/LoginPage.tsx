// Local: /frontend/src/pages/auth/LoginPage.tsx

import React, { useState } from "react";
import type { Route } from "../../types";
import { EyeIcon, EyeOffIcon } from "../../components/Icons";
import Logo from "../../components/ui/Logo";
import PrimaryButton from "../../components/ui/PrimaryButton";
import InputField from "../../components/ui/InputField";
import { API_BASE_URL } from "../../src/apiConfig"; // (ou '../apiConfig' dependendo da pasta)

// 1. ATUALIZAÇÃO DAS PROPS:
// A prop 'onLogin' foi renomeada para 'onLoginSuccess' para ser mais clara.
// Agora ela passará o token recebido para o componente pai.
interface LoginPageProps {
  setRoute: (route: Route) => void;
  onLoginSuccess: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setRoute, onLoginSuccess }) => {
  // 2. CRIAÇÃO DOS ESTADOS:
  // Controlamos os valores dos inputs e o feedback da UI (erros/carregamento).
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 3. FUNÇÃO DE SUBMISSÃO DO FORMULÁRIO:
  // Esta função é o coração da integração.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Impede que a página recarregue ao enviar o formulário
    setLoading(true);
    setError(null);

    try {
      // 4. CHAMADA PARA A API BACK-END:
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviamos o email e a senha no formato que o backend espera
        body: JSON.stringify({ email, senha }),
      });

      // 5. TRATAMENTO DA RESPOSTA:
      if (!response.ok) {
        // Se o login falhar (ex: status 403), mostramos uma mensagem de erro genérica.
        throw new Error("E-mail ou senha inválidos.");
      }

      const data = await response.json(); // Extrai o corpo da resposta (ex: { "token": "..." })

      // 6. SUCESSO!
      // Chamamos a função do componente pai para salvar o token e atualizar o estado da aplicação.
      onLoginSuccess(data.token);
      // Navegamos o usuário para a página do catálogo.
      setRoute({ name: "productCatalog" });
    } catch (err: any) {
      // Se ocorrer qualquer erro, guardamos a mensagem para exibir ao usuário.
      setError(err.message);
    } finally {
      // Garante que o estado de "carregando" seja desativado, mesmo se der erro.
      setLoading(false);
    }
  };

  // 7. ATUALIZAÇÃO DO JSX:
  // O formulário agora está conectado aos nossos estados e à função handleSubmit.
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      <Logo />
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg mt-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-title">Entrar</h2>

        {/* O formulário agora chama handleSubmit ao ser enviado */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="email"
            label="Nome de usuário ou e-mail"
            type="email"
            value={email} // Conectado ao estado 'email'
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email'
            required
          />

          <div className="relative">
            <InputField
              id="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              value={senha} // Conectado ao estado 'senha'
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado 'senha'
              required
            />
            <button
              type="button" // Impede que este botão envie o formulário
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Exibe a mensagem de erro se ela existir */}
          {error && (
            <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </p>
          )}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Entrando..." : "ACESSAR"}
          </PrimaryButton>
        </form>

        <div className="text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setRoute({ name: "forgotPassword" });
            }}
            className="text-sm text-primary hover:underline"
          >
            Perdeu sua senha?
          </a>
        </div>
        <div className="text-center text-sm text-body-text">
          Ainda não tem uma conta?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setRoute({ name: "register" });
            }}
            className="font-bold text-primary hover:underline"
          >
            Cadastre-se
          </a>
          <br />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setRoute({ name: "adminLogin" });
            }}
            className="text-gray-500 hover:underline mt-2 inline-block"
          >
            Acessar como Administrador
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
