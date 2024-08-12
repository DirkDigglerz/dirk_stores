import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMantineTheme, Flex, Text } from "@mantine/core";

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
        style={{
          backgroundColor: 'var(--mantine-primary-color-9)',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.xs,
          border: `1px solid var(--mantine-primary-color-9)`,
        }} />
      <Flex
        direction='column'
      >
        <Text p='0' style={{
          fontFamily: 'Akrobat Bold'
        }}>{props.storeName.toUpperCase()}</Text>
        <Text size='xs'
          c='grey'
        >{props.storeInfo.toUpperCase()}</Text>
      </Flex>
    </Flex>
  );
}
