// Local: /frontend/src/components/ui/PrimaryButton.tsx

import React from "react";

// 1. ATUALIZAÇÃO DA INTERFACE DE PROPS:
// Além de 'children' e 'className', ele agora aceita qualquer outra prop
// que um elemento <button> normal do HTML aceitaria.
interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    // 2. A CORREÇÃO PRINCIPAL:
    // O '{...props}' espalha todas as outras propriedades (como onClick, type, disabled)
    // diretamente no elemento <button> do HTML.
    <button
      className={`w-full text-base font-bold py-3 px-4 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed ${className}`}
      {...props} // <<< ESTA É A LINHA QUE RESOLVE O PROBLEMA
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
