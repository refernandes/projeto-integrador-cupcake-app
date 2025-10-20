// Local: /frontend/src/pages/auth/RegisterPage.tsx

import React, { useState } from "react";
import type { Route } from "../../types";
import Logo from "../../components/ui/Logo";
import PrimaryButton from "../../components/ui/PrimaryButton";
import InputField from "../../components/ui/InputField";

interface RegisterPageProps {
  setRoute: (route: Route) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setRoute }) => {
  // 1. Estados para controlar os campos do formulário e feedback da UI
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Validação client-side: verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      // Chamada para a API de registro do backend
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviamos os dados no formato que o backend espera (ClienteCadastroDTO)
        body: JSON.stringify({ nome, email, senha, telefone }),
      });

      if (!response.ok) {
        // Tenta ler a mensagem de erro do backend (ex: "e-mail já existe")
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Falha ao cadastrar. Tente novamente."
        );
      }

      // Sucesso!
      alert(
        "Cadastro realizado com sucesso! Você será redirecionado para a tela de login."
      );
      setRoute({ name: "login" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-full p-6">
      <Logo />
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg mt-8 space-y-4">
        <h2 className="text-2xl font-bold text-center text-title">
          Crie sua Conta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="fullName"
            label="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <InputField
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            id="phone"
            label="Telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <InputField
            id="password"
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <InputField
            id="confirmPassword"
            label="Confirmar Senha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </p>
          )}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "CADASTRAR"}
          </PrimaryButton>
        </form>

        <div className="text-center text-sm">
          Já tem uma conta?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setRoute({ name: "login" });
            }}
            className="font-bold text-primary hover:underline"
          >
            Acesse
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
