import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMantineTheme, Flex, Text } from "@mantine/core";
import colorWithAlpha from "../../utils/colorWithAlpha";

type StoreNameProps = {
  storeName: string;
  storeInfo: string;
  icon: string;
};

export function StoreName(props: StoreNameProps) {
  const theme = useMantineTheme();
  return (
    <Flex
      align='center'
      p='xs'

      gap='xs'
    >
      <FontAwesomeIcon
        icon={props.icon as IconName}
        color={colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.9)}
        style={{
          backgroundColor: colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.2),
          padding: '0.7vh',
          fontSize: '2.5vh',
          borderRadius: '0.2em',
          border: `2px solid var(--mantine-primary-color-9)`,
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)',
          aspectRatio: '1/1',
        }} 
      />
      <Flex
        direction='column'
        gap='0.25vh'
      >
        <Text 
          p='0' 
          size='1.9vh'
          style={{
            fontFamily: 'Akrobat Bold'
          }}
        >{props.storeName.toUpperCase()}</Text>
        <Text size='1.5vh'
          c='grey'
        >{props.storeInfo.toUpperCase()}</Text>
      </Flex>
    </Flex>
  );
}
