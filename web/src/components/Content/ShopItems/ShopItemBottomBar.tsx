import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { ItemProps } from "../../types";

type StoreItemBottomBarProps = {
  hovered: boolean;
} & ItemProps;

function StoreItemBottomBar(props: StoreItemBottomBarProps) {
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
        gap='0.5vh'
      >
        <Text size='1.8vh'>{props.label}</Text>
        <Text size='1.5vh' c='grey'
          style={{
            maxHeight: '2rem',
            overflowY: 'auto',
          }}  

        >{props.description}</Text>
      </Flex>


      <FontAwesomeIcon 
        icon='cart-plus' 
        color={props.hovered? 
          'rgba(255,255,255,0.9)':
          'rgba(255,255,255,0.5)'
        }
        style={{
          fontSize: '1.8vh',
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

export default StoreItemBottomBar;