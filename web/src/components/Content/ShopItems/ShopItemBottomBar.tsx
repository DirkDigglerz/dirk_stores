import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { ItemProps } from "../../types";

type ShopItemBottomBarProps = {
  hovered: boolean;
} & ItemProps;

function ShopItemBottomBar(props: ShopItemBottomBarProps) {
  const theme = useMantineTheme();
  return ( 
    <Flex
      flex={1}
      bg='rgba(55,55,55,0.1)'
      p='xs'
      align={'center'}
    >
      <Flex
        direction='column'
        p='0.25rem'
      >
        <Text size='sm'>{props.label}</Text>
        <Text size='xs' c='grey'
          style={{
            maxHeight: '2rem',
            overflowY: 'auto',
          }}  

        >{props.description}</Text>
      </Flex>


      <FontAwesomeIcon 
        icon='cart-plus' 
        size='xs' 
        style={{
          marginLeft: 'auto',
          padding: '0.45rem',
          backgroundColor: props.hovered ? 
            colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8):
            colorWithAlpha(theme.colors[theme.primaryColor][9], 0.3),
          cursor: 'pointer',
          transition: 'all ease-in-out 0.1s',
          borderRadius: theme.radius.xs,  
        }}  
      />

    </Flex>
  )
}

export default ShopItemBottomBar;