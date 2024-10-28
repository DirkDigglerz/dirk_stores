import { useStore } from "../../providers/store/provider";
import { internalEvent } from "../../utils/internalEvent";
import Content from "../Content/Content";
import { Header } from "../Header/Header";
import Background from "./Background";


export default function StoreUI(){
  const {display} = useStore();
  return (
    <Background display={display}>
      <Header/>
      <Content/>

    </Background>
  )

}


internalEvent([
  {
    action: 'OPEN_STORE',
    data: {
      storeInfo: {
        hasCategories: false,
        canManage: true,
        name: 'Test Store',
        description: 'Test Store Desc',
        icon: 'user',
        type : 'sell',
        
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
          stock: 1
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
//         storeInfo: {
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
