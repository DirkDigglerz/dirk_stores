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
import { SettingsProps, useSettings } from "../../stores/settings";


export default function StoreUI(){  
  const open = useStore((state) => state.open);

  useNuiEvent<Partial<UseStoreProps> & {
    theme: {
      primaryColor: SettingsProps['primaryColor'];
      primaryShade: SettingsProps['primaryShade'];
      customTheme: SettingsProps['customTheme'];
    }
  }>('OPEN_STORE', (data) => {
    // Reset the store state

    // clear any cart items that arent in the new data.stock 
    if (data.stock){
      const currentCart = useStore.getState().cart;
      const newCart = data.stock
        ? currentCart.filter(item => data.stock!.some(stockItem => stockItem.id === item.id))
        : [];
      useStore.setState({ cart: newCart });
    }

    // set in the theme if passed   
    useSettings.setState({
      primaryColor: data.theme.primaryColor,
      primaryShade: data.theme.primaryShade,
      customTheme: data.theme.customTheme,
    });

    // set to default categoryy if current not set or not in new data.categories
    const selectedCategory = useStore.getState().selectedCategory;
    if (!data.categories || !data.categories.some(category => category.name === selectedCategory)) {
      useStore.setState({ selectedCategory: data.categories?.[0]?.name });
    }

    useStore.setState({
      open: true,
      categories: data.categories,
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
      gap='xs'
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
        <Flex
          flex={1}
          h='fit-content'
          direction={'column'}
          gap='xs'
        >
          <Categories />
          <Items />
        </Flex>
        <Checkout />
      </Flex>

    </Background>
  )

}