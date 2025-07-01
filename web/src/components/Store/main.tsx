import { Flex } from "@mantine/core";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { fetchNui } from "../../utils/fetchNui";
import Background from "../Generic/Background";
import Categories from "./Categories";
import Checkout from "./Checkout";
import Header from "./Header";
import Items from "./Items";
import { useStore, UseStoreProps } from "./useStore";
import { notifications, Notifications } from "@mantine/notifications";


export default function StoreUI(){  
  const open = useStore((state) => state.open);

  useNuiEvent<Partial<UseStoreProps>>('OPEN_STORE', (data) => {
    // Reset the store state

    // clear any cart items that arent in the new data.stock 
    if (data.stock){
      const currentCart = useStore.getState().cart;
      const newCart = data.stock
        ? currentCart.filter(item => data.stock!.some(stockItem => stockItem.id === item.id))
        : [];
      useStore.setState({ cart: newCart });
    }

    // set to default categoryy if current not set or not in new data.categories
    const selectedCategory = useStore.getState().selectedCategory;
    if (!data.categories || !data.categories.some(category => category.name === selectedCategory)) {
      useStore.setState({ selectedCategory: data.categories?.[0]?.name });
    }

    useStore.setState({
      open: true,
      ...data,
    });
  });


  useNuiEvent('CLOSE_STORE', () => {
    notifications.clean();
    notifications.cleanQueue();
    useStore.setState({ open: false });
  });

  return (
    <Background 
      open={open}
      escapeKey
      onClose={() => {
        fetchNui('CLOSE_STORE');
      }}
      p='6vh'
      gap='sm'
    >
      <Notifications position='bottom-left'/>
      <Header />
      <Flex
        flex={1}
        gap='sm'
        mah='100%'
        style={{
          overflow: 'hidden',
        }}
      >
        <Categories />
        <Items />
        <Checkout />
      </Flex>

    </Background>
  )

}