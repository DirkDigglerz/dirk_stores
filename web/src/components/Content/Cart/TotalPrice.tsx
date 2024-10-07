import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useSettings } from "../../../providers/settings/settings";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { useLocale } from "../../../providers/locales/locales";

type TotalPriceProps = {
  total: number;
};

export default function TotalPrice(props: TotalPriceProps) {
  const theme = useMantineTheme();
  const settings = useSettings();
  const locale = useLocale();
  return (
    <Flex
      align={'center'}
    >
      <Flex
        direction='column'
        w='100%'
        gap='0.25vh'
      >
        <Text
          size='2vh'
          c={colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}
          style={{
            fontFamily: 'Akrobat Bold'
          }}
        >{locale('payment')}</Text>
        <Text size='1.5vh' c='grey'>{locale('total_price')}</Text>
      </Flex>
      <Text
        size='2vh'
        c={colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}
        style={{
          fontFamily: 'Akrobat Bold'
        }}
      >{settings.currency}{props.total}</Text>
    </Flex>
  )

}