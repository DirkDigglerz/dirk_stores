import { Flex } from "@mantine/core";
import { CartItemProps } from "../../types";
import Button from "../../Main/Button";
import { useStore } from "../../../providers/store/provider";

export default function CartItemButtons(props: CartItemProps) {
  const {funcs} = useStore();
  return (
    <Flex
      align='center'
      gap='xs'
      ml='auto'
    >
      <Button icon='fa-minus' hoverColor='red' iconSize='xs' onClick={() => funcs.removeFromCart(props.listing_id, 1)} />
      <Button icon='fa-plus' hoverColor='green' iconSize='xs' onClick={() => funcs.addToCart(props.listing_id, 1)} />
      <Button icon='fa-trash' hoverColor='red' iconSize='xs' onClick={() => funcs.removeFromCart(props.listing_id, props.amount)} />
    </Flex>
  )
}