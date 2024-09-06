import { Flex } from "@mantine/core";
import { StoreName } from "./StoreName";
import { InfoBox } from "./InfoBox";


export type HeaderProps = {
  // define expected props here
  storeInfo:{
    name: string;
    icon: string
    description: string;
  }
};

export function Header(props: HeaderProps) {
  return (
    <Flex
      justify='space-between'
      align={'center'}
      w='100%'
      p='xs'
    >
      <StoreName storeName={props.storeInfo.name} storeInfo={props.storeInfo.description} icon={props.storeInfo.icon} />
      <InfoBox leftSide='ESCAPE' rightSide='CLOSE' />
    </Flex>
  );
}
