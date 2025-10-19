import React from 'react';

interface AdminHeaderProps {
    onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => (
    <header className="bg-title text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Painel do Administrador</h1>
        <button onClick={onLogout} className="font-semibold hover:underline">Sair</button>
    </header>
);

export default AdminHeader;
