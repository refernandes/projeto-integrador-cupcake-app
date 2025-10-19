import React from 'react';

const InputField: React.FC<{ id: string; label: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }> = ({ id, label, type = 'text', value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-body-text mb-1">{label}</label>
        <input id={id} name={id} type={type} value={value} onChange={onChange} placeholder={placeholder} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
);

export default InputField;
