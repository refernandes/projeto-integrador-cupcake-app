import React from 'react';

// FIX: Add 'disabled' prop to component props and pass it to the button element. Added disabled styles.
const PrimaryButton: React.FC<{ onClick?: () => void; children: React.ReactNode; className?: string; type?: 'button' | 'submit'; disabled?: boolean; }> = ({ onClick, children, className = '', type = 'button', disabled }) => (
  <button type={type} onClick={onClick} disabled={disabled} className={`w-full bg-primary text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}>
    {children}
  </button>
);

export default PrimaryButton;