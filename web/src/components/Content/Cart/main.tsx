import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchNui } from "../../../utils/fetchNui";
import Button from "../../Main/Button";
import { StoreInfoProps } from "../../Main/main";
import { CartItemProps, ItemProps } from "../../types";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import { notifications } from "@mantine/notifications";
import { useLocale } from "../../../providers/locales/locales";






type CartProps = {
  items: ItemProps[];
  cart: CartItemProps[];
  setCart: (cart: CartItemProps[]) => void;
  storeInfo: StoreInfoProps;
};

export default function Cart(props: CartProps) {
  const [total, setTotal] = useState(0);
  const locale = useLocale();
  useEffect(() => {
    // calculate the total price of all items in the cart
    let total = 0;
    props.cart.forEach((item) => {
      const itemInfo = props.items.find((i) => i.listing_id === item.listing_id);
      if (itemInfo) {
        total += item.amount * itemInfo.price;
      }
    });
    setTotal(total);
  }, [props.cart, props.items]);

  const removeItem = (listing_id: string, amount:number) => {
    // remove x item from the cart if it exists and if it gets to 0 completely remove it
    const item = props.cart.find((item) => item.listing_id === listing_id);
    if (item) {
      if (item.amount - amount <= 0) {
        console.log('remove item', listing_id);
        const newCart = props.cart.filter((item) => item.listing_id !== listing_id);
        props.setCart(newCart);
      } else {
        const newCart = props.cart.map((item) => {
          if (item.listing_id === listing_id) {
            return {
              ...item,
              amount: item.amount - amount
            };
          }
          return item;
        });
        props.setCart(newCart);
      }
    }
  };

  const addItem = (listing_id: string, amount:number) => {
    console.log('add item', listing_id, amount);
    // add more of this item to teh cart only if there is enough left in items stock
    const item = props.items.find((item) => item.listing_id === listing_id);
    const cartItem = props.cart.find((item) => item.listing_id === listing_id);
    if (item && cartItem) {
      if (!item.stock || cartItem.amount < item.stock) {
        const newCart = props.cart.map((item) => {
          if (item.listing_id === listing_id) {
            return {
              ...item,
              amount: item.amount + amount
            };
          }
          return item;
        });
        props.setCart(newCart);
      }
    }

  };

  return (
    <Flex  
      m='xs'
      ml='xl'
      flex={0.4} 
      direction='column'
      
    >
      <Text
        size='2vh'
      >
        {props.storeInfo.type == 'buy' ? locale('shopping_cart'): locale('items_to_sell')}

      </Text>
      <Flex
        direction='column'
        flex={1}
        gap='md'
        p='xs'
        style={{
          overflowY: 'auto'
        }}
      >
        {props.cart.map((item, index) => (
          <CartItem key={index} {...item} addItem={addItem} removeItem={removeItem} />
        ))}

      </Flex>
      <Flex
        mt='auto'
        direction='column'
        gap='xs'
      >
        <TotalPrice total={total} />
        <Flex
          w='100%'
          justify='space-evenly'
          gap='xs'
        >


      
         {props.storeInfo.paymentMethods.map((method) => (
            <Button text={method.name} w='100%' icon ={method.icon as IconName} disabled={total === 0} 
              onClick={() => {

                type ReturnData = {
                  transaction: boolean;
                  fail_message: string;
                };
                fetchNui<ReturnData>('MAKE_TRANSACTION', {method: method.id, cart: props.cart}).then(response => {
                  console.log('payment response', response.transaction, response.fail_message);
                  if (response.fail_message) {
                    notifications.show({
                      title: locale('transaction_failed'),
                      message: locale(response.fail_message),
                    })
                  }

                  if (response.transaction) {
                    props.setCart([]);  
                  }
                });
                
              }} 
            />
          ))}
          
        </Flex>
      </Flex>
    </Flex>
  )
}