import { Flex } from "@mantine/core";
import { CartItemProps } from "../../types";
import Button from "../../Main/Button";

export default function CartItemButtons(props: CartItemProps & {removeItem: (listing_id: string, amount: number) => void , addItem: (listing_id: string, amount: number) => void}) {
  return (
    <Flex
      align='center'
      gap='xs'
      ml='auto'
    >
      <Button icon='fa-minus' hoverColor='red' iconSize='xs' onClick={() => props.removeItem(props.listing_id, 1)} />
      <Button icon='fa-plus' hoverColor='green' iconSize='xs' onClick={() => props.addItem(props.listing_id, 1)} />
      <Button icon='fa-trash' hoverColor='red' iconSize='xs' onClick={() => props.removeItem(props.listing_id, props.amount)} />
    </Flex>
  )
}