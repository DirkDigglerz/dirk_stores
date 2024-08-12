import { Flex } from "@mantine/core";
import { StoreName } from "./StoreName";
import { InfoBox } from "./InfoBox";


export type HeaderProps = {
  // define expected props here
  shopInfo:{
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
      <StoreName storeName={props.shopInfo.name} storeInfo={props.shopInfo.description} icon={props.shopInfo.icon} />
      <InfoBox leftSide='ESCAPE' rightSide='CLOSE' />
    </Flex>
  );
}
