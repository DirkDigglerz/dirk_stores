import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useSettings } from "../../../providers/settings/settings";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { CartItemProps } from "../../types";

export default function CartItemInfo(props:CartItemProps){ 
  const settings = useSettings();
  const theme = useMantineTheme();
  return (
    <Flex
      direction='column'
      gap='0.25vh'
    >
      <Text size='1.8vh'
        style={{
          fontFamily: 'Akrobat Bold'
        }}
      >{props.label}</Text>
      <Text
        size='1.5vh'
        c={colorWithAlpha(theme.colors[theme.primaryColor][9], 0.9)}
      >{settings.currency}{props.price}</Text>
    </Flex>
  )
}