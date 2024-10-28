import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Flex, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useLocale } from "../../../providers/locales/locales";
import { useStore } from "../../../providers/store/provider";
import { fetchNui } from "../../../utils/fetchNui";
import Button from "../../Main/Button";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";







export default function Cart() {
  const {cart,store, items, funcs} = useStore();
  const [total, setTotal] = useState(0);
  const locale = useLocale();
  useEffect(() => {
    // calculate the total price of all items in the cart
    let total = 0;
    cart.forEach((item) => {
      const itemInfo = items.find((i) => i.listing_id === item.listing_id);
      if (itemInfo) {
        total += item.amount * itemInfo.price;
      }
    });
    setTotal(total);
  }, [cart, items]);


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
        {store.type == 'buy' ? locale('shopping_cart'): locale('items_to_sell')}

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
        {cart.map((item, index) => (
          <CartItem key={index} {...item} />
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


      
         {store.paymentMethods.map((method) => (
            <Button text={method.name} w='100%' icon ={method.icon as IconName} disabled={total === 0} 
              onClick={() => {

                type ReturnData = {
                  transaction: boolean;
                  fail_message: string;
                };
                fetchNui<ReturnData>('MAKE_TRANSACTION', {method: method.id, cart: cart}).then(response => {
                  if (response.fail_message) {
                    notifications.show({
                      title: locale('transaction_failed'),
                      message: locale(response.fail_message),
                    })
                  }

                  if (response.transaction) {
                    funcs.setCart([]);  
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