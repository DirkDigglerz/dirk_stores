import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useSettings } from "../../../providers/settings/settings";
import colorWithAlpha from "../../../utils/colorWithAlpha";

type TotalPriceProps = {
  total: number;
};

export default function TotalPrice(props: TotalPriceProps) {
  const theme = useMantineTheme();
  const settings = useSettings();
  return (
    <Flex
      align={'center'}
    >
      <Flex
        direction='column'
        w='100%'
      >
        <Text
          size='sm'
          c={colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}
          style={{
            fontFamily: 'Akrobat Bold'
          }}
        >Payment</Text>
        <Text size='xs' c='grey'>Total Price</Text>
      </Flex>
      <Text
        size='xl'
        c={colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}
        style={{
          fontFamily: 'Akrobat Bold'
        }}
      >{settings.currency}{props.total}</Text>
    </Flex>
  )

}