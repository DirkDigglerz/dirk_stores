import { Flex, Image, Text, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { locale } from "../../stores/locales";
import { useSettings } from "../../stores/settings";
import Button from "../Generic/Button";
import CustomFlex from "../Generic/CustomFlex";
import { ItemProps, useStore } from "./useStore";

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
          fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
        }}
      >{locale(type == 'buy' ? 'Checkout' : 'Items to Sell')}</Text>
      <Flex
        direction={'column'}
        gap='sm'
      >
        {cart.map((item) => (
          <CheckoutItem
            key={item.id}
            {...item}
          />
        ))}
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
          >
            {locale('TotalPrice')}
          </Text>
        </Flex>
        <Text
          fw={600}
        >
          {selectedMethod?.symbol} {totalPrice}
        </Text>
      </Flex>
      <Flex
        justify={'space-between'}
        gap='sm'
        wrap={'wrap'}
      >
        {paymentMethods.map((method) => (
          <Button
            key={method.id}
            selected={selectedMethod?.id === method.id}
            text={method.name.toUpperCase()}
            icon={method.icon}
            style={{
              fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
            }}
            onClick={() => {
              useStore.setState({ selectedMethod: method });
              // checkout(method.id);
            }}
            flex={1}
          />
        ))}
      </Flex>
      <Button
        w='100%'
        text={type === 'buy' ? locale('Buy').toUpperCase() : locale('Sell').toUpperCase()}
        icon={type === 'buy' ? 'fa-shopping-cart' : 'fa-hand-holding-dollar'}
        style={{
          fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
        }}
        onClick={() => {
          checkout();
        }}
      />
    </Flex>
  )
}

function CheckoutItem(props: ItemProps & { quantity: number }) {
  const theme = useMantineTheme();
  const currency = useSettings((data) => data.currency);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);

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
        src={props.image}
        alt={props.name}
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
        >{currency}{props.price * props.quantity}</Text>
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
          hoverColor={theme.colors.red[9]}
          onClick={() => removeFromCart(props.id, props.quantity)}
          icon='trash'
        />
      </Flex>
    </CustomFlex>
  )
}