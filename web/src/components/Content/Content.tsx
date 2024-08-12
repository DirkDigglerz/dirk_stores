import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { CartItemProps, CategoryProps, ItemProps } from "../types";
import { Categories } from "./Categories";
import ShopContainer from "./ShopItems/ShopContainer";
import Cart from "./Cart/main";
import { ShopInfoProps } from "../Main/main";

type ContentProps = {
  categories: CategoryProps[];
  items: ItemProps[];
  setItems: (items: ItemProps[]) => void;
  cart: CartItemProps[];
  setCart: (cart: CartItemProps[]) => void;
  shopInfo:ShopInfoProps;
};

export default function Content(props: ContentProps) {
  const [category, setCategory] = useState<string>('Category 1');

  useEffect(() => {
    setCategory(props.categories[0].name);
  }, [props.categories]);

  return (
    <Flex
      w='100%'
      flex={1}
    >
      <Categories category={category} categories={props.categories} setCategory={setCategory} />
      <ShopContainer items={props.items} setItems={props.setItems} category={category} cart={props.cart} setCart={props.setCart} />
      <Cart cart={props.cart} setCart={props.setCart} items={props.items} shopInfo={props.shopInfo} />
      
    </Flex>
  )
}