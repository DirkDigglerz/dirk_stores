import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Image, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useMemo } from "react";
import { locale } from "../../stores/locales";
import { useSettings } from "../../stores/settings";
import colorWithAlpha from "../../utils/colorWithAlpha";
import CustomFlex from "../Generic/CustomFlex";
import { motion } from "framer-motion";
import { ItemProps, useStore } from "./useStore";

export default function Items() {
  const theme = useMantineTheme();
  const selectedCategory = useStore((state) => state.selectedCategory);
  const stock = useStore((state) => state.stock);
  const filteredItems = useMemo(() => {
    if (!selectedCategory) return stock;
    return stock.filter(stock => stock.category === selectedCategory);
  }, [stock, selectedCategory]);
  
  return (
    <Flex
      flex={0.6}
      mah='100%'
      p='xs'
      pr='sm'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(25vh, 1fr))',
        gap: theme.spacing.sm,
        overflowY: 'auto',
      }}
    >
      {filteredItems.map((item, index) => (
        <Item
          key={index}
          index={index}
          {...item}
        />
      ))}
    </Flex>
  )
}


export function Item(props:ItemProps & { index: number }) {
  const {hovered, ref} = useHover();
  const theme = useMantineTheme();
  const game = useSettings((data) => data.game);
  const addToCart = useStore((state) => state.addToCart);
  const selectedMethod = useStore((data) => data.selectedMethod);
  const cart = useStore((state) => state.cart);
  const isInCart = useMemo(() => {
    return cart.some(item => item.id === props.id);
  }, [cart, props.id]);


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: props.index * 0.05 }} 
    >



    <CustomFlex
      pos='relative'
      ref={ref}
      bg='rgba(77, 77, 77, 0.5)'
      direction={'column'}
      h='25vh'
      style={{
        borderRadius: theme.radius.xxs,
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: !props.stock || props.stock > 0 ? 'auto' : 'none',
        transition: 'all 0.2s ease',
        filter: hovered ? 'brightness(1.2)' : 'brightness(1)',
      }}
      onClick={() => addToCart(props)}
    >
      <Flex
        pos='absolute'
        top='1vh'
        right='1.5vh'
        gap='xs'
      >
        {props.stock && (
          <ItemInfo 
            label={`${locale('Stock').toUpperCase()} ${props.stock.toString()}`}  
          />
        )}

        <ItemInfo
          label={`${selectedMethod?.symbol} ${props.price}`}
        />
      </Flex>

      <Image
        src={props.image}
        alt={props.name}
        // w='100%'
        // 
        // flex={1}
        h='72%'
        p='lg'
        // bg='green'
        m='auto'


        // m='auto'
        style={{
          aspectRatio: '1 / 1',
          objectFit: 'contain',
          display: 'flex',
        }}
      />
      <CustomFlex
        mt='auto'
        w='100%'
        pl='sm'
        pr='sm'
        align={'center'}
        p='sm'
        bg='rgba(22, 22, 22, 0.5)'
      >
        <Text
          size='sm'
          style={{
            fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
          }}
        >
          {props.label}
        </Text>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInCart ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            marginLeft: 'auto',
          }}
        >
          <CustomFlex
            ml='auto'
            p='1vh'
            bg='rgba(77, 77, 77, 0.5)'
            style={{
              borderRadius: theme.radius.xxs,
              transition: 'background-color 0.2s ease',
            }}
          >
          <FontAwesomeIcon  
            icon='basket-shopping'
            style={{
              fontSize: theme.fontSizes.sm,
            }}
          />
          </CustomFlex>
        </motion.div>
      </CustomFlex>
    </CustomFlex>
    </motion.div>
  )
} 

type ItemInfoProps = {
  icon?: string;
  label: string;
  miw?: string;
}

function ItemInfo(props:ItemInfoProps) {
  const theme = useMantineTheme();
  return (
    <CustomFlex
      mih={props.miw}
      align='center'
      justify={'center'}
      bg={colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.5)}
      // p='xs'
     
      style={{
        padding: '0.5vh 1vh',
        borderRadius: theme.radius.xxs,
      }}
      

    >
      {props.icon && (
        <FontAwesomeIcon 
          icon={props.icon as IconProp} 
          style={{ 
            fontSize: '1.5vh', 
            marginRight: '0.5vh' 
          }}
        />
      )}
      <Text size='xs' c='white'>
        {props.label}
      </Text>
    </CustomFlex>
  )
}