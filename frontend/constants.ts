import type { Cupcake, Order, User, Address } from './types';
import { OrderStatus } from './types';

export const MOCK_ADDRESSES: Address[] = [
    {
        id: 1,
        cep: "01001-000",
        street: "Praça da Sé",
        number: "100",
        neighborhood: "Sé",
        city: "São Paulo",
        complement: "Apto 101"
    }
];

export const MOCK_USER: User = {
  id: 1,
  name: 'Ana Silva',
  email: 'ana.silva@example.com',
  phone: '11987654321',
  addresses: MOCK_ADDRESSES,
};

export const CUPCAKES: Cupcake[] = [
    { id: 1, name: 'Chocolate Belga', price: 12.00, description: 'Massa de cacau belga com ganache de chocolate meio amargo.', image: 'https://picsum.photos/seed/chocobelga/400/400', category: 'Chocolate', stock: 15, active: true },
    { id: 2, name: 'Baunilha Francesa', price: 10.00, description: 'A delicadeza da baunilha em uma combinação perfeita.', image: 'https://picsum.photos/seed/baunilha/400/400', category: 'Baunilha', stock: 20, active: true },
    { id: 3, name: 'Morango & Champ.', price: 14.00, description: 'Massa leve de morango, recheio de geleia artesanal e cobertura de merengue.', image: 'https://picsum.photos/seed/morango/400/400', category: 'Frutas', stock: 22, active: true },
    { id: 4, name: 'Limão Siciliano', price: 11.00, description: 'Massa cítrica de limão siciliano com recheio de curd de limão e cobertura de merengue.', image: 'https://picsum.photos/seed/limao/400/400', category: 'Frutas', stock: 18, active: true },
    { id: 5, name: 'Caramelo Salgado', price: 13.00, description: 'Massa de baunilha com recheio de caramelo salgado e cobertura cremosa.', image: 'https://picsum.photos/seed/caramelo/400/400', category: 'Baunilha', stock: 25, active: true },
    { id: 6, name: 'Framboesa', price: 12.50, description: 'Massa de baunilha com um toque de framboesa fresca na cobertura.', image: 'https://picsum.photos/seed/framboesa/400/400', category: 'Frutas', stock: 12, active: true },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: '#1726',
        date: '2023-10-26',
        items: [
            { cupcake: CUPCAKES[0], quantity: 2 },
            { cupcake: CUPCAKES[2], quantity: 1 },
        ],
        total: 38.00,
        status: OrderStatus.Delivered,
        user: MOCK_USER,
        address: MOCK_ADDRESSES[0]
    },
    {
        id: '#1725',
        date: '2023-10-24',
        items: [
            { cupcake: CUPCAKES[3], quantity: 4 },
        ],
        total: 48.00,
        status: OrderStatus.Delivered,
        user: MOCK_USER,
        address: MOCK_ADDRESSES[0]
    }
];