import { SimpleGrid } from "@mantine/core";
import { CartItemProps, ItemProps } from "../../types";
import ShopItem from "./ShopItem";

type ShopContainerProps = {
  items: ItemProps[];
  setItems: (items: ItemProps[]) => void;
  cart: CartItemProps[];
  setCart: (cart: CartItemProps[]) => void;
  category: string;
};

export default function ShopContainer(props: ShopContainerProps) {

  const addToCart = (listing_id: string) => {
    // add to cart if it exists and if there is enough stock
    const item = props.items.find((item) => item.listing_id === listing_id);
    const cartItem = props.cart.find((item) => item.listing_id === listing_id);
    if (!cartItem && item) {
      props.setCart([...props.cart, {
        label: item.label,
        amount: 1,
        price: item.price,
        listing_id: item.listing_id,
        image: item.image
      }]);
    } 
  }

  const existsInCart = (listing_id: string) => {
    // check if the item exists in the cart
    return props.cart.some((item) => item.listing_id === listing_id);
  }

  return (
    <SimpleGrid
      p='xs'
      cols={4}
      verticalSpacing="xs"
      flex={1}
      mah='65vh' // Set each item to take up 50% of the grid's height
      spacing="xs"
      style={{ height: "100%",

        overflowY: "auto"
      }} // Ensure SimpleGrid fills the parent's height
    >
       {/* // Map over the items and render each one if it matches the category */}
      {props.items.map((item) => {
        if (item.category === props.category) {
          return <ShopItem key={item.listing_id} {...item} addToCart={addToCart} existsInCart={existsInCart(item.listing_id)} />;
        }
        return null;
      })}
    </SimpleGrid>
  );
}
