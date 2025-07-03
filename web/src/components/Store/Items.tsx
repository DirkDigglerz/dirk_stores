import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { locale } from "../../stores/locales";
import { useSettings } from "../../stores/settings";
import colorWithAlpha from "../../utils/colorWithAlpha";
import CustomFlex from "../Generic/CustomFlex";
import GlowImage from "../Generic/GlowImage";
import { ItemProps, useStore } from "./useStore";



export default function Items() {
  const theme = useMantineTheme();
  const categories = useStore((state) => state.categories);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const stock = useStore((state) => state.stock);
  const filteredItems = useMemo(() => {
    if (!categories || !selectedCategory) return stock;
    return stock.filter(stock => stock.category === selectedCategory);
  }, [stock, selectedCategory, categories]);
  
  return (
    <Flex
      flex={categories ? 0.6 : 1}
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }} 
        >
          <Item
            key={index}
            {...item}
          />
        </motion.div>
      ))}
    </Flex>
  )
}

export function Item(props:ItemProps) {
  const {hovered, ref} = useHover();
  const theme = useMantineTheme();
  const game = useSettings((data) => data.game);
  const addToCart = useStore((state) => state.addToCart);
  const selectedMethod = useStore((data) => data.selectedMethod);
  const cart = useStore((state) => state.cart);
  const isInCart = useMemo(() => {
    return cart.some(item => item.id === props.id);
  }, [cart, props.id]);
  
  const itemImagePath = useSettings((data) => data.itemImagePath);

  return (
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
        pointerEvents: !props.disabled && (!props.stock || props.stock > 0)? 'auto' : 'none',
        transition: 'all 0.2s ease',
        // filter: hovered ? 'brightness(1.2)' : 'brightness(1)',
        filter: hovered ? 'brightness(1.2)' : 'brightness(1)',
      
      }}
      onMouseEnter={() => {
        if (props.disabled) {
          return;
        }
        if (props.stock && props.stock <= 0) {
          return;
        }
        // scale up a little 
        ref.current?.style.setProperty('transform', 'scale(1.02)');
      }}
      onMouseLeave={() => {
        if (props.disabled) {
          return;
        }
        if (props.stock && props.stock <= 0) {
          return;
        }
        // scale back down
        ref.current?.style.setProperty('transform', 'scale(1)');
      }}
      onClick={() =>{
        if (props.disabled) {
          return;
        }
        if (props.stock && props.stock <= 0) {
          return;
        }
        addToCart(props)
      }}
      >
      <DisabledOverlay
        {...props}
      />

      <Flex
        pos='absolute'
        top='0'
        left='0'
        w='100%'
        h='100%'
        style={{
          zIndex: 1,
          filter: props.disabled ? 'blur(0.2vh)' : 'none',
        }}
      >
        <Flex
          pos='absolute'
          top='1vh'
          right='1.5vh'
          gap='xs'
        >
          {props.stock !== undefined && (
            <ItemInfo 
              label={`${locale('Stock').toUpperCase()} ${props.stock.toString()}`}  
            />
          )}

          <ItemInfo
            label={`${selectedMethod?.symbol} ${props.price}`}
          />
        </Flex>

        <GlowImage
          src={`${itemImagePath}/${props.name}.png`}
          alt={props.name}
          h='72%'
          p='lg'
          m='auto'
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
      </Flex>
    </CustomFlex>
  )
} 

type ItemInfoProps = {
  icon?: string;
  label: string;
}

function ItemInfo(props:ItemInfoProps) {
  const theme = useMantineTheme();
  return (
    <CustomFlex
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

function DisabledOverlay(props:ItemProps) {
  const theme = useMantineTheme();
  const game = useSettings((data) => data.game);
  return (
    <Flex
      pos='absolute'
      top='0'
      left='0'
      w='100%'
      h='100%'
      bg='rgba(86, 5, 5, 0.5)'
      align='center'
      justify='center'
      p='lg'
      display={props?.disabled ? 'flex' : 'none'}
      style={{
        zIndex: 5,
      }}
    >
      <CustomFlex
        align='center'
        justify='center'
        gap='sm'
        bg='rgba(77, 77, 77, 0.5)'
        p='xs'
        pl='sm'
        pr='sm'
        style={{
          borderRadius: theme.radius.xxs,
          boxShadow: theme.shadows.sm,
        }}
      >
        <FontAwesomeIcon
          icon={props?.disabled?.icon as IconProp}
          style={{
            fontSize: theme.fontSizes.md,
            color: 'white',
          }}
        />
        <Text
          size='xs'
          c='rgba(255, 255, 255, 0.8)'
          style={{
            fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
            marginTop: '0.5vh',
          }}
        >
          {props?.disabled?.message.toUpperCase() || locale('ItemDisabled')}
        </Text>
      </CustomFlex>
    </Flex>    
  )

}