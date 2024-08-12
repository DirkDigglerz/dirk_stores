import { Flex, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { ItemProps } from "../../types";
import ShopItemBottomBar from "./ShopItemBottomBar";
import { ShopItemImage } from "./ShopItemImage";
import { ShopItemTopBar } from "./ShopItemTopBar";
import { useEffect, useState } from "react";
import CenterIconWrapper from "./ShopItemWrapper";
import colorWithAlpha from "../../../utils/colorWithAlpha";



export default function ShopItem(props: ItemProps & {addToCart: (listing_id: string) => void, existsInCart: boolean}) {
  const theme = useMantineTheme();
  const {hovered, ref} = useHover();
  const [isHovered, setIsHovered] = useState(false);


  // Stop hover if props.disabled
  useEffect(() => {
    if (props.disableMessage) {
      setIsHovered(false);
      return 
    }
    setIsHovered(hovered);
  }, [hovered])

  useEffect(() => {
    console.log("in_cart", props.existsInCart)
  }, [props.existsInCart])

  return (
    <CenterIconWrapper
      icon={props.disableIcon}
      message={props.disableMessage}
      hovered={isHovered}
      inCart={props.existsInCart}
    >

      <Flex
        onClick={
          props.disableMessage ? undefined : !props.existsInCart ? () => props.addToCart(props.listing_id) : undefined
        }
        ref={ref}
        flex={1}
        bg={!props.existsInCart ? 
          isHovered ? 'rgba(77,77,77,0.6)': 'rgba(77,77,77,0.3)':
          colorWithAlpha(theme.colors[theme.primaryColor][9], 0.25)
        }
        w="100%"
        h="fit-content" // Set each item to take up 50% of the grid's height
        style={{
          transition: 'all ease-in-out 0.1s',
          borderRadius: theme.radius.xs,
          backdropFilter: 'blur(5px)',
          cursor: 'pointer',
          outline: isHovered ? `2px solid ${theme.colors[theme.primaryColor][9]}` : 'none',
          filter: props.disableMessage && 'blur(3px)' || 'none',
        }}
        direction='column'
      >
        <Flex
          direction='column'
          bg='rgba(77,77,77,0.7)'
          style={{
            backdropFilter: 'blur(5px)',
          }}
        >
          <ShopItemTopBar {...props} hovered={isHovered || props.existsInCart} />
          <ShopItemImage {...props} />


        </Flex>

          <ShopItemBottomBar {...props} hovered={isHovered || props.existsInCart} />

      </Flex>
    </CenterIconWrapper>
  )
}