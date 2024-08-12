import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type ShopItemIconProps = {
  icon: string;
  value: number | string;
  hovered: boolean;
} 

export function ShopItemIcon(props:ShopItemIconProps){
  const theme = useMantineTheme();
  return (
    <Flex
      bg={props.hovered ? 
        colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8):
        colorWithAlpha(theme.colors[theme.primaryColor][9], 0.3)
      }
      align={'center'}
      gap='0.15rem'
      p='0.15rem'

      style={{
        transition: 'all ease-in-out 0.1s',
        borderRadius: theme.radius.xs,
      }}
    >
      <FontAwesomeIcon icon={props.icon as IconName} size='xs' />
      <Text size="xs">{props.value}</Text>
    </Flex>
  )
}