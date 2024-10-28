import { Flex, Text } from "@mantine/core";

type InfoBoxProps = {
  leftSide: string;
  rightSide: string;
};
export function InfoBox(props: InfoBoxProps) {
  return (
    <Flex
      w='fit-content'
      h='60%'
      style={{
        borderRadius: '0.25em',
        overflow: 'hidden',
        border: `1px solid rgba(77,77,77,0.6)`
      }}
      align='center'
    >
      <Flex
        h='100%'
        p='0.8em'
        bg='rgba(77,77,77,0.2)'
        direction='column'
        justify='center'
        align='center'
      >
        <Text c='lightgrey' size='1.5vh'
          style={{
            fontFamily: 'Akrobat Bold'
          }}>{props.leftSide}</Text>
      </Flex>

      <Flex
         h='100%'
        p='0.8em'
        bg='rgba(77,77,77,0.5)'
        direction='column'
        align='center'
        justify='center'
      >
        <Text c='lightgrey' size='1.5vh'
          style={{
            fontFamily: 'Akrobat Bold'
          }}
        >{props.rightSide}</Text>
      </Flex>

    </Flex>
  );
}
