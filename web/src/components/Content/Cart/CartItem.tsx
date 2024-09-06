import { Flex, Image, Box, useMantineTheme, Text } from "@mantine/core";
import { CartItemProps } from "../../types";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import CartItemInfo from "./CartItemInfo";
import CartItemButtons from "./CartItemButtons";


export default function CartItem(props: CartItemProps & { addItem: (listing_id: string, amount:number) => void, removeItem: (listing_id: string, amount:number) => void }) {
  const theme = useMantineTheme();
  return (
    <Box style={{ position: 'relative' }} w="100%" >
      {/* Box for the number */}
  
      <Box
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5px',
            backgroundColor: theme.colors[theme.primaryColor][6],
            color: 'white',
            borderRadius: theme.radius.sm,
            padding: '0.1rem 0.4rem',  
            fontSize: '1vh',
            fontWeight: 700,
            textAlign: 'center',
            zIndex: 1000, // Ensure it is above other content
          }}
        >
          <Text size='1.8vh'>{props.amount}</Text>
        </Box>
      

      {/* Existing content */}
      <Flex
        w='100%'
        bg='rgba(77,77,77,0.5)'
        p='xs'
        gap='xs'
        align='center'
        h='10.5vh'
      >
        <Image
          src={props.image}
          alt={props.label}
          fit="contain"
          h='100%'
          w='25%'
          p='0.2rem'
          bg='rgba(77,77,77,0.8)'
          style={{
            aspectRatio: '1/1',
            backdropFilter: 'blur(5px)',
            borderRadius: theme.radius.xs,
            outline: `1px dashed ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}`
          }}
        />
        <CartItemInfo {...props} />
        <CartItemButtons {...props} addItem={props.addItem} removeItem={props.removeItem} />
      </Flex>
    </Box>
  );
}
