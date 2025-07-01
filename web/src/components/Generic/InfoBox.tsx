import { useMantineTheme, Flex, Text } from "@mantine/core";
import { useSettings } from "../../stores/settings";

type InfoBoxProps = {
  leftSide: string;
  rightSide: string;
};
export function InfoBox(props: InfoBoxProps) {
  const theme = useMantineTheme();
  const game = useSettings((state) => state.game);

  return (
    <Flex
      w='fit-content'
      align='center'
      // h='3vh'
      style={{
        borderRadius: theme.radius.xxs,
        overflow: 'hidden',
        // border: `0.25vh solid rgba(77, 77, 77, 0.37)`
        fontFamily: game === 'fivem' ? 'Akrobat Bold' : 'Red Dead',
      }}
    >
      <Flex
        // flex={1}
        p='xxs'
        h='100%'
        bg='rgba(77,77,77,0.2)'
        direction='column'
        justify='center'
        align='center'
      >
        <Text c='grey' size='xs'>{props.leftSide}</Text>
      </Flex>

      <Flex
        p='xxs'
        h='100%'
        // flex={1}
        w='fit-content'
        bg='rgba(77, 77, 77, 0.39)'
        direction='column'
        align='center'
        justify='center'
      >
        <Text c='grey' size='xs'>{props.rightSide}</Text>
      </Flex>

    </Flex>
  );
}
