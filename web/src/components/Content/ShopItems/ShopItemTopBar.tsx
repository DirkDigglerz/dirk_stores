import { Flex } from "@mantine/core";
import { ShopItemIcon } from "./ShopItemIcon";


type ShopItemTopBarProps = {
  price: number;
  stock?: number;
  hovered: boolean;
};
export function ShopItemTopBar(props: ShopItemTopBarProps) {
  return (
    <Flex
      direction='row-reverse'
      p='xs'
      gap='0.25rem'
    >
      <ShopItemIcon icon='dollar-sign' value={props.price} hovered={props.hovered} />
      {props.stock && (
        <ShopItemIcon icon='box' value={props.stock} hovered={props.hovered} />
      )}
    </Flex>
  );
}
