import { Flex, Image } from "@mantine/core";
import { ItemProps } from "../../types";

export function ShopItemImage(props: ItemProps) {
  return (
    <Flex

      h='15vh'
      p='xs'
      justify={'center'}
    >
      <Image
        src={props.image}
        alt={props.name}
        fit='contain' />
    </Flex>
  );
}
