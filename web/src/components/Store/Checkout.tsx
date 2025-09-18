import { Flex, Image, Text, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { locale } from "../../stores/locales";
import { useSettings } from "../../stores/settings";
import Button from "../Generic/Button";
import CustomFlex from "../Generic/CustomFlex";
import { ItemProps, useStore } from "./useStore";
import NothingPNG from './nothing.png'
import { motion, AnimatePresence } from "framer-motion";


export default function Checkout() {
  const game = useSettings((data) => data.game);
  const cart = useStore((data) => data.cart);
  const type = useStore((data) => data.type);
  const totalPrice = useStore((data) =>
    data.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const selectedMethod = useStore((data) => data.selectedMethod);
  const paymentMethods = useStore((data) => data.paymentMethods);
  useEffect(() => {
    // default to the first payment method if none is selected
    if (!selectedMethod && paymentMethods.length > 0) {
      useStore.setState({ selectedMethod: paymentMethods[0] });
    }
  }, [selectedMethod, paymentMethods]);

  const checkout = useStore((data) => data.checkout);
  return (
    <Flex
      direction='column'
      flex={0.3}
      gap='sm'
      p='xs'
      // bg='green'
    >
      <Text
        size='md'
        style={{
          fontFamily: game === 'fivem' ? 'Akrobat Black' : 'Red Dead',
        }}
      >{locale(type == 'buy' ? 'Checkout' : 'Items to Sell')}</Text>


      <Flex
        direction={'column'}
        gap='sm'
        // mah='75vh'
        mih='60vh'
        mah='60vh'
        pr='xxs'
        style={{
          overflowY: 'auto',
        }}
      >
        <AnimatePresence mode="popLayout">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }
              }}
              exit={{ 
                opacity: 0, 
                x: -100, 
                scale: 0.95,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
            >
              <CheckoutItem
                key={item.id}
                {...item}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>
      <Flex
        mt='auto'
        align='center'
        justify='space-between'
      >
        <Flex
          direction={'column'}
        >
          <Text
            style={{
              fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
            }}
          >{locale('Payment')}</Text>
          <Text
            size='sm'
            c='rgba(255, 255, 255, 0.7)'
          >
            {locale('TotalPrice')}
          </Text>
        </Flex>
        <Text
          fw={600}
        >
          {selectedMethod?.symbol}{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={totalPrice} // This triggers re-animation when totalPrice changes
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
              exit={{ 
                opacity: 0, 
                y: 10, 
                scale: 0.9,
                transition: {
                  duration: 0.15,
                  ease: "easeIn"
                }
              }}
            >
              {totalPrice}
            </motion.span>
          </AnimatePresence>
        </Text>
      </Flex>
      <Button
        size='sm'
        label={type === 'buy' ? locale('Buy').toUpperCase() : locale('Sell').toUpperCase()}
        icon={type === 'buy' ? 'fa-shopping-cart' : 'fa-hand-holding-dollar'}
        onClick={() => {
          checkout();
        }}
      />
    </Flex>
  )
}

function CheckoutItem(props: ItemProps & { quantity: number }) {
  const theme = useMantineTheme();
  const selectedMethod = useStore((data) => data.selectedMethod);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const itemImgPath = useSettings((data) => data.itemImgPath);

  const game = useSettings((data) => data.game);
  return (
    <CustomFlex
      bg='rgba(77, 77, 77, 0.5)'
      pr={game == 'rdr3' ? 'lg' : 'sm'}
      pl={game == 'rdr3' ? 'md' : 'sm'}
      align='center'
      p='sm'
      gap='xs'
      style={{
        borderRadius: theme.radius.xxs,
      }}
    >
      <Image
        src={`${itemImgPath}${props.name}.png`}
        alt={props.name}
        fallbackSrc={NothingPNG}
        fz='xxs'
        w='5vh'
        h='5vh'
        style={{
          objectFit: 'contain',
        }}
      />
      <Flex
        direction='column'
      >
        <Text
          size='sm'
          style={{
            fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
          }}
        >{props.label}</Text>
        <Text
          c='rgba(255, 255, 255, 0.7)'
          size='xs'
          fw={500}
        >{selectedMethod?.symbol}{props.price * props.quantity}</Text>
      </Flex>


      <Flex
        ml='auto'
        gap='xxs'
        align='center'
      >
        <Button
          icon='minus'
          onClick={() => removeFromCart(props.id, 1)}
        />
        <input
          style={{
            width: '3.5vh',
            height: '3.5vh',
            fontSize: '1.5vh',
            textAlign: 'center',
            backgroundColor: 'rgba(77, 77, 77, 0.4)',
            outline: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
          value={props.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value > 0) {
              addToCart(props, value - props.quantity);
            } else if (value <= 0) {
              removeFromCart(props.id, props.quantity);
            }
          }}
     
        />
        <Button
          icon='plus'
          onClick={() => addToCart(props, 1)}  
        
        />
        <Button
          color='#ff4d4d'
          onClick={() => removeFromCart(props.id, props.quantity)}
          icon='trash'
        />
      </Flex>
    </CustomFlex>
  )
}