import { useState, useEffect } from "react";

export interface CartItem {
  productId: number;
  quantity: number;
}

const CART_KEY = "ognepech_cart";
const USER_KEY = "ognepech_user";

export interface UserData {
  name: string;
  email: string;
  phone: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  statusLabel: string;
  items: CartItem[];
  total: number;
  address: string;
}

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadUser(): UserData | null {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

function saveUser(user: UserData | null) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

let cartListeners: Array<() => void> = [];
let userListeners: Array<() => void> = [];
let _cart: CartItem[] = loadCart();
let _user: UserData | null = loadUser();

export function getCart(): CartItem[] { return _cart; }
export function getUser(): UserData | null { return _user; }

export function addToCart(productId: number, qty = 1) {
  const existing = _cart.find((i) => i.productId === productId);
  if (existing) {
    _cart = _cart.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + qty } : i);
  } else {
    _cart = [..._cart, { productId, quantity: qty }];
  }
  saveCart(_cart);
  cartListeners.forEach((l) => l());
}

export function removeFromCart(productId: number) {
  _cart = _cart.filter((i) => i.productId !== productId);
  saveCart(_cart);
  cartListeners.forEach((l) => l());
}

export function updateQuantity(productId: number, quantity: number) {
  if (quantity <= 0) { removeFromCart(productId); return; }
  _cart = _cart.map((i) => i.productId === productId ? { ...i, quantity } : i);
  saveCart(_cart);
  cartListeners.forEach((l) => l());
}

export function clearCart() {
  _cart = [];
  saveCart(_cart);
  cartListeners.forEach((l) => l());
}

export function placeOrder(form: { name: string; phone: string; email: string; address: string; comment: string }, total: number) {
  const order: Order = {
    id: `OP-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
    status: "processing",
    statusLabel: "В обработке",
    items: [..._cart],
    total,
    address: form.address,
  };
  const currentUser = _user || { name: form.name, email: form.email, phone: form.phone, orders: [] };
  currentUser.orders = [order, ...currentUser.orders];
  _user = { ...currentUser, name: form.name, email: form.email, phone: form.phone };
  saveUser(_user);
  userListeners.forEach((l) => l());
  clearCart();
  return order.id;
}

export function loginUser(data: Omit<UserData, "orders">) {
  _user = { ...data, orders: _user?.orders || [] };
  saveUser(_user);
  userListeners.forEach((l) => l());
}

export function logoutUser() {
  _user = null;
  saveUser(null);
  userListeners.forEach((l) => l());
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(_cart);
  useEffect(() => {
    const listener = () => setCart([..._cart]);
    cartListeners.push(listener);
    return () => { cartListeners = cartListeners.filter((l) => l !== listener); };
  }, []);
  return cart;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(_user);
  useEffect(() => {
    const listener = () => setUser(_user ? { ..._user } : null);
    userListeners.push(listener);
    return () => { userListeners = userListeners.filter((l) => l !== listener); };
  }, []);
  return user;
}
