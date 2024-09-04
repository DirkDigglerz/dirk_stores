import { useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { internalEvent } from "../../utils/internalEvent";
import Content from "../Content/Content";
import { Header } from "../Header/Header";
import { CartItemProps, CategoryProps, ItemProps } from "../types";
import Background from "./Background";



export type ShopInfoProps = {
  name: string;
  description: string;
  icon: string;
  paymentMethods: {
    id: string;
    name: string;
    icon: string;
  }[];
}

export default function ShopUI(){
  const [display, setDisplay] = useState(false);
  const [shopInfo, setShopInfo] = useState<ShopInfoProps>({
    name: 'Test Store',
    description: 'Test Store Desc',
    icon: 'user',
    paymentMethods: [
      {id: 'cash', name: 'Cash', icon: 'money-bill-wave'},
      {id: 'card', name: 'Card', icon: 'credit-card'}
    ] 
  });
  const [cart, setCart] = useState<CartItemProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      name: 'Health',
      icon: 'user',
      description: 'Health Category'
    },
    {
      name: 'Food',
      icon: 'bread-slice',
      description: 'Food Category'
    },
  ]);

  const [items, setItems] = useState<ItemProps[]>([
    {
      listing_id: 'listing_1',
      name: 'drivers_license',
      price: 10,
      label: 'Drivers License',
      image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png',
      metadata: [],
      description: 'This is a drivers license I mean you could probably drive with it',
      category: 'Health',
      stock: 10
    },
    {
      listing_id: 'listing_2',
      name: 'Item 1',
      price: 10,
      label: 'Item 1',
      image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/medical/bandage.png',
      metadata: [],
      description: 'Item 1',
      category: 'Food',
      stock: 10
    },
  ]);


  useNuiEvent('OPEN_SHOP', (data: {
    categories: CategoryProps[];
    items: ItemProps[];
    shopInfo: ShopInfoProps;

  }) => {
    setShopInfo(data.shopInfo);
    setCategories(data.categories);
    setItems(data.items);
    setDisplay(true);

  });

  useNuiEvent('CLOSE_SHOP', () => {
    setDisplay(false);
    setCategories([]);
    setCart([]);
    setItems([]);
  });






  return (
    <Background display={display}>
      <Header shopInfo={shopInfo} />
      <Content categories={categories} items={items} setItems={setItems} cart={cart} setCart={setCart} shopInfo={shopInfo} />

    </Background>
  )

}


internalEvent([
  {
    action: 'OPEN_SHOP',
    data: {
      shopInfo: {
        name: 'Test Store',
        description: 'Test Store Desc',
        icon: 'user',
        
        paymentMethods: [
          {id: 'cash', name: 'Cash', icon: 'money-bill-wave'},
          {id: 'card', name: 'Card', icon: 'credit-card'},
          {id: 'dumpster', name: 'NewbCoin', icon: 'credit-card'}
        ],

      },

      categories: [
        {
          name: 'Health',
          icon: 'user',
          description: 'Health Category'
        },
        {
          name: 'Food',
          icon: 'bread-slice',
          description: 'Food Category'
        },
      ],
      items: [
        {
          listing_id: 'listing_1',
          name: 'drivers_license',
          price: 10,
          label: 'Drivers License',
          image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png',
          metadata: [],
          description: 'This is a drivers license I mean you could probably drive with it',
          category: 'Health',
          disableIcon: 'exclamation-triangle',
          disableMessage: 'Out of Stock',
          stock: 10
        },
        {
          listing_id: 'listing_3',
          name: 'drivers_license',
          price: 10,
          label: 'Drivers License',
          image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png',
          metadata: [],
          description: 'This is a drivers license I mean you could probably drive with it',
          category: 'Health',
          stock: 10
        },
        {
          listing_id: 'listing_2',
          name: 'Item 1',
          price: 10,
          label: 'Item 1',
          image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/medical/bandage.png',
          metadata: [],
          description: 'Item 1',
          category: 'Food',
          stock: 10
        },
      ],
    },
  }
])

// setTimeout(() => {
//   internalEvent([
//     {
//       action: 'OPEN_SHOP',
//       data: {
//         shopInfo: {
//           name: 'Test Store 2',
//           description: 'Test Store Desc 2',
//           icon: 'user'
//         },
        
//         categories: [
//           {
//             name: 'Health',
//             icon: 'user',
//             description: 'Health Category'
//           },
//           {
//             name: 'Food',
//             icon: 'bread-slice',
//             description: 'Food Category'
//           },
//         ],

//         items:[
//           {
//             listing_id: 'listing_3',
//             name: 'drivers_license',
//             price: 10,
//             label: 'Drivers License',
//             image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png',
//             metadata: [],
//             description: 'This is a drivers license I mean you could probably drive with it',
//             category: 'Health',
//             stock: 10
//           },
//           {
//             listing_id: 'listing_4',
//             name: 'Item 1',
//             price: 10,
//             label: 'Item 1',
//             image: 'https://raw.githubusercontent.com/fazitanvir/items-images/main/medical/bandage.png',
//             metadata: [],
//             description: 'Item 1',
//             category: 'Food',
//             stock: 10
//           }
//         ]
//       },
//     },
//   ])

//   setTimeout(() => {
//     internalEvent([
//       {
//         action: 'CLOSE_SHOP',
//       }
//     ])  
//   } , 5000)
// } , 10000)
