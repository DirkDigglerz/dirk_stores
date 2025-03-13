import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { StoreInfoProps } from "./types";
import { CartItemProps, CategoryProps, ItemProps } from "../../components/types";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { notifications } from "@mantine/notifications";
import { fetchNui } from "../../utils/fetchNui";

// Create a context with default values

type StoreProviderProps = {
  display: boolean;
  store: StoreInfoProps;
  categories: CategoryProps[];
  items: ItemProps[];
  cart: CartItemProps[];
  funcs: {
    setDisplay: (value: boolean) => void;
    addToCart: (listing_id: string, amount?: number) => void;
    removeFromCart: (listing_id: string, amount: number) => void;
    existsInCart: (listing_id: string) => boolean;
    setCart: (value: CartItemProps[]) => void;
    removeCategory: (category: string) => void;
    addCategory: (category: CategoryProps) => void;
  };
};


const StoreContext = createContext<StoreProviderProps | undefined>(undefined);

// Create a provider component



export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [display, setDisplay] = useState(false);
  const [cart, setCart] = useState<CartItemProps[]>([]);
  const [store, setStore] = useState<StoreInfoProps>({
    name: 'Test Store',
    hasCategories: true,
    description: 'Test Store Desc',
    icon: 'user',
    type: 'sell', // sell or buy
    paymentMethods: [
      {id: 'cash', name: 'Cash', icon: 'money-bill-wave'},
      {id: 'card', name: 'Card', icon: 'credit-card'}
    ] 
  });

  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      name: 'Health',
      icon: 'user',
      description: 'Health Category'
    },
    {
      name: 'Food',
      icon: 'bread-slice',
      description: 'Food Category'
    },
  ]);

  const [items, setItems] = useState<ItemProps[]>([
    {
      listing_id: 'listing_1',
      name: 'drivers_license',
      price: 10,
      label: 'Drivers License',
      image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png',
      metadata: [],
      description: 'This is a drivers license I mean you could probably drive with it',
      category: 'Health',
      stock: 10
    },
    {
      listing_id: 'listing_3',
      name: 'drivers_license',
      price: 10,
      label: 'Drivers License',
      image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png',
      metadata: [],
      description: 'This is a drivers license I mean you could probably drive with it',
      category: 'Health',
      stock: 10
    },
    {
      listing_id: 'listing_2',
      name: 'Item 1',
      price: 10,
      label: 'Item 1',
      image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/medical/bandage.png',
      metadata: [],
      description: 'Item 1',
      category: 'Food',
      stock: 10
    },
  ]);

  const functions = {
    setDisplay: setDisplay,
    setCart: setCart,

    removeCategory: (category: string) => {
      const newCategories = categories.filter((cat) => cat.name !== category);
      setCategories(newCategories);
    },

    addCategory: (category: CategoryProps) => { 
      setCategories([...categories, category]);
    },

    addToCart:(listing_id: string, amount?: number) => {
      // add to cart if it exists and if there is enough stock
      const item = items.find((item) => item.listing_id === listing_id);
      const cartItem = cart.find((item) => item.listing_id === listing_id);
      if (!cartItem && item) {
        setCart([...cart, {
          label: item.label,
          amount: amount || 1,
          price: item.price,
          listing_id: item.listing_id,
          image: item.image
        }]);
      } 
    },
  
    removeFromCart: (listing_id: string, amount:number) => {
      // remove x item from the cart if it exists and if it gets to 0 completely remove it
      const item = cart.find((item) => item.listing_id === listing_id);
      if (item) {
        if (item.amount - amount <= 0) {
          const newCart = cart.filter((item) => item.listing_id !== listing_id);
          setCart(newCart);
        } else {
          const newCart = cart.map((item) => {
            if (item.listing_id === listing_id) {
              return {
                ...item,
                amount: item.amount - amount
              };
            }
            return item;
          });
          setCart(newCart);
        }
      }
    },

    existsInCart:(listing_id: string) => {
      // check if the item exists in the cart
      return cart.some((item) => item.listing_id === listing_id);
    },
  }




  useNuiEvent('OPEN_STORE', (data: {
    categories: CategoryProps[];
    items: ItemProps[];
    storeInfo: StoreInfoProps;

  }) => {
    setStore(data.storeInfo);
    setCategories(data.categories);
    setItems(data.items);
    setDisplay(true);

  });

  useNuiEvent('CLOSE_STORE', () => {
    setDisplay(false);
    setCart([]);
  });

  useEffect(() => {
    if (!display) {
      notifications.dirk();
    } 
  }, [display]);

  // escape key to close the store
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && display) {
        fetchNui('STORE_CLOSED');
        setDisplay(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);


  return (
    <StoreContext.Provider value={{
      display: display,
      store: store,
      categories: categories,
      items: items,
      cart: cart,
      funcs: functions,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
