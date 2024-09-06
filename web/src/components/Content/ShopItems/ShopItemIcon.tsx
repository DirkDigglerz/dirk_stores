import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type StoreItemIconProps = {
  icon: string;
  value: number | string;
  hovered: boolean;
} 

export function StoreItemIcon(props:StoreItemIconProps){
  const theme = useMantineTheme();
  return (
    <Flex
      bg={props.hovered ? 
        colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8):
        colorWithAlpha(theme.colors[theme.primaryColor][9], 0.3)
      }
      align={'center'}
      gap='0.25vh'
      p='0.15rem'

      style={{
        transition: 'all ease-in-out 0.1s',
        borderRadius: theme.radius.xs,
      }}
    >
      <FontAwesomeIcon icon={props.icon as IconName} 
        style={{
          fontSize: '1.8vh',
        }}
      />
      <Text size="1.8vh">{props.value}</Text>
    </Flex>
  )
}