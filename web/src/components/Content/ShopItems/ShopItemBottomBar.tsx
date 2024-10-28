import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { ItemProps } from "../../types";
import { useHover } from "@mantine/hooks";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useStore } from "../../../providers/store/provider";

type StoreItemBottomBarProps = {
  hovered: boolean;
} & ItemProps;

function StoreItemBottomBar(props: StoreItemBottomBarProps) {
  const {store, funcs} = useStore();
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
        h='4em'
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

        <Flex
          ml='auto'
          gap='0.75em'
        >
          {store.canManage &&(
            <StoreItemButton
              hovered={props.hovered}
              disabled={props.disableMessage}
              icon='edit'
            />
          )}

          <StoreItemButton
            hovered={props.hovered}
            icon='cart-plus'
            disabled={props.disableMessage || !store.canManage}
            onClick={() => funcs.addToCart(props.listing_id, 1)}
          />

        </Flex>

    </Flex>
  )
}

export default StoreItemBottomBar;

type StoreItemButtonProps = {
  hovered: boolean;
  icon: string; 
  disabled
  onClick?: () => void;
}

function StoreItemButton(props: StoreItemButtonProps){
  const {hovered, ref} = useHover();
  const {store} = useStore();
  const theme = useMantineTheme();
  return ( 
    <Flex
      ref={ref}
    >
      <FontAwesomeIcon 
        icon={props.icon as IconProp}
        color={props.hovered? 
          'rgba(255,255,255,0.9)':
          'rgba(255,255,255,0.6)'
        }
        style={{
          fontSize: '1.8vh',

          padding: '0.45rem',
          backgroundColor: props.hovered || (store.canManage && !props.disabled &&  hovered) ? 
            colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8):
            colorWithAlpha(theme.colors[theme.primaryColor][9], 0.3),
          cursor: 'pointer',
          transition: 'all ease-in-out 0.1s',
          borderRadius: '0.3rem',
        }}  
        onClick={() => {
          if (!props.disabled && store.canManage) {
            if (!props.onClick) return;
            props.onClick();
          }
        }}
      />

    </Flex>
  )
}