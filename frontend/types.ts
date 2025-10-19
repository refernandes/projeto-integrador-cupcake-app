
export interface Cupcake {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  active: boolean;
}

export interface CartItem {
  cupcake: Cupcake;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
}

export enum OrderStatus {
  Confirmed = "Pedido Confirmado",
  Preparing = "Em Preparo",
  OnTheWay = "A Caminho",
  Delivered = "Entregue",
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  user: User;
  address: Address;
}

export type Route = 
  | { name: 'login' }
  | { name: 'register' }
  | { name: 'forgotPassword' }
  | { name: 'catalog' }
  | { name: 'productDetail', id: number }
  | { name: 'cart' }
  | { name: 'deliveryAddress' }
  | { name: 'payment' }
  | { name: 'orderConfirmation', orderId: string }
  | { name: 'orderTracking', orderId: string }
  | { name: 'account' }
  | { name: 'editProfile' }
  | { name: 'orderHistory' }
  | { name: 'adminLogin' }
  | { name: 'adminDashboard' }
  | { name: 'adminManageProducts' }
  | { name: 'adminProductForm', id?: number }
  | { name: 'adminManageOrders' }
  | { name: 'adminOrderDetail', orderId: string };