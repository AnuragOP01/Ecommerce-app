import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  
  addToCart: (product) => {
    const existingItem = get().cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      set({
        cartItems: get().cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cartItems: [...get().cartItems, { ...product, quantity: 1 }],
      });
    }
  },
  
  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter(item => item.id !== productId),
    });
  },
  
  increaseQuantity: (productId) => {
    set({
      cartItems: get().cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    });
  },
  
  decreaseQuantity: (productId) => {
    const item = get().cartItems.find(item => item.id === productId);
    
    if (item && item.quantity === 1) {
      get().removeFromCart(productId);
    } else {
      set({
        cartItems: get().cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      });
    }
  },
  
  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  
  clearCart: () => {
    set({ cartItems: [] });
  },
}));
