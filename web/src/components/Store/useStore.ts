import { create } from "zustand";
import { isEnvBrowser } from "../../utils/misc";
import { notifications } from "@mantine/notifications";
import { locale } from "../../stores/locales";
import { fetchNui } from "../../utils/fetchNui";


export type PaymentMethod = {
  id: string; // Unique identifier for the payment method
  name: string; // Name of the payment method
  symbol: string; // Symbol representing the payment method
  icon: string; // Icon representing the payment method
}

export type CategoryProps = {
  name: string;
  description: string;
  icon: string;
}

export type ItemProps = {
  id: string; // Unique identifier for the item
  name: string; 
  
  image: string;
  stock?: number; // Optional stock property
  category?: string;
  label: string;
  description: string;
  price: number;

  disabled?: {
    icon: string; // Icon to display when the item is disabled
    message: string; // Message to display when the item is disabled
  } // Optional disabled property for items that are out of stock or unavailable
}

export type UseStoreProps = {
  open: boolean;

  selectedMethod?: PaymentMethod; // Optional selected payment method
  selectedCategory?: string;

  type: 'sell' | 'buy'; // Type of store, either 'sell' or 'buy'
  name: string;
  icon: string;
  description: string;
  paymentMethods: PaymentMethod[];
  categories?: CategoryProps[];
  stock: ItemProps[];

  cart: (ItemProps & {
    quantity: number;
  })[];
  addToCart: (item: ItemProps, quantity?: number) => void;
  removeFromCart: (itemId: string, quantity?: number) => void;
  checkout: () => void; // Optional checkout function
}

export const useStore = create<UseStoreProps>((set) => ({
  open: isEnvBrowser() ? true : false, // Default to true in browser environment
  type: 'sell', // Default store type
  name: 'Black Market',
  icon: 'fa-store',
  description: 'A hidden store for illegal items and services.',

  paymentMethods: [
    {
      id: 'cash',
      name: 'Cash',
      symbol: '$',
      icon: 'fa-money-bill-wave',
    },
    {
      id: 'card',
      name: 'Card',
      symbol: '$',
      icon: 'fa-credit-card',
    },
    {
      id: 'crypto',
      name: 'Crypto',
      symbol: '₿',
      icon: 'fa-credit-card',
    },
  ],

  categories: [
    {
      name: 'Weapons',
      description: 'Manage your weapons and ammunition.',
      icon: 'fa-gun',
    },
    {
      name: 'Clothing',
      description: 'Customize your character\'s appearance.',
      icon: 'fa-tshirt',
    },
    {
      name: 'Vehicles',
      description: 'Manage your vehicles and upgrades.',
      icon: 'fa-car',
    },
    {
      name: 'Inventory',
      description: 'View and manage your items.',
      icon: 'fa-box-open',
    }
  ],

  stock: [
    {
      id: 'pistol_store_id_001',
      name: 'Pistol',
      stock: 10,
      category: 'Weapons',
      label: '9mm Pistol',
      image: 'https://raw.githubusercontent.com/bitc0de/fivem-items-gallery/refs/heads/main/images/illegal/adress_book.png',
      description: 'A standard 9mm pistol with a magazine capacity of 15 rounds.',
      price: 500,
    },
    {
      id: 'pistol_store_id_002',
      name: 'Pistol',
      stock: 0,
      disabled: {
        icon: 'fa-ban',
        message: 'This item is currently out of stock.',
      },
      category: 'Weapons',
      label: '9mm Pistol',
      image: 'https://raw.githubusercontent.com/bitc0de/fivem-items-gallery/refs/heads/main/images/illegal/adress_book.png',
      description: 'A standard 9mm pistol with a magazine capacity of 15 rounds.',
      price: 500,
    },
    {
      id: 'pistol_store_id_003',
      name: 'Pistol',
      category: 'Weapons',
      label: '9mm Pistol',
      image: 'https://raw.githubusercontent.com/bitc0de/fivem-items-gallery/refs/heads/main/images/illegal/adress_book.png',
      description: 'A standard 9mm pistol with a magazine capacity of 15 rounds.',
      price: 500,
    },
  ],

  cart: [],
  addToCart: (item, quantity = 1) =>{
    // check stock 
    if (item.stock && item.stock < quantity) {
      notifications.show({
        title: locale('InsufficientStock'),
        message: locale('NotEnoughStock', item.name, item.stock.toString(), quantity.toString()),
        color: 'red',
      });
      return;
    }
    set((state) => {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // If the item already exists in the cart, increase the quantity
        if (item.stock &&  existingItem.quantity + quantity > item.stock) {
          notifications.show({
            title: locale('InsufficientStock'),
            message: locale('NotEnoughStock', item.name, item.stock.toString(), (existingItem.quantity + quantity).toString()),
            color: 'red',
          });
          return state; // No change if stock is insufficient
        }
        return {
          cart: state.cart.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
          ),
        };
      } else {
        // If the item does not exist, add it to the cart with the specified quantity
        return {
          cart: [...state.cart, { ...item, quantity }],
        };
      }
    });
  },

  removeFromCart: (itemId, quantity = 1) => set((state) => {
    const existingItem = state.cart.find(cartItem => cartItem.id === itemId);
    if (existingItem) {
      if (existingItem.quantity > quantity) {
        // If the item quantity is greater than the specified quantity, decrease the quantity
        return {
          cart: state.cart.map(cartItem =>
            cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - quantity } : cartItem
          ),
        };
      } else {
        // If the item quantity is less than or equal to the specified quantity, remove it from the cart
        return {
          cart: state.cart.filter(cartItem => cartItem.id !== itemId),
        };
      }
    }
    return state; // No change if item not found
  }),

  checkout: () => {
    // Placeholder for checkout logic
    const method = useStore.getState().selectedMethod?.id;
    if (!method) {
      notifications.show({
        title: locale('NoPaymentMethod'),
        message: locale('SelectPaymentMethod'),
        color: 'red',
      });
      return;
    }
    const cartItems = useStore.getState().cart;
    if (cartItems.length === 0) {
      notifications.show({
        title: locale('EmptyCart'),
        message: locale('CartIsEmpty'),
        color: 'red',
      });
      return;
    }

    fetchNui<{
      success: boolean;
      error?: string;
    }>('MAKE_TRANSACTION', {
      method: method,
      cart: cartItems, 
    }, {
      success: true,
    }).then((response) => {
      if (response.success) {
        set({ cart: [] }); // Clear the cart after successful transaction
      } else {
        notifications.show({
          title: locale('TransactionFailed'),
          message: locale(response.error as string) || locale('UnknownError'),
          color: 'red',
        });
      }
    })
  }
}));
