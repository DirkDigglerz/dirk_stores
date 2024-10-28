import { Box, Flex, Image, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../../utils/colorWithAlpha";
import { CartItemProps } from "../../types";
import CartItemButtons from "./CartItemButtons";
import CartItemInfo from "./CartItemInfo";


export default function CartItem(props: CartItemProps) {
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
            borderRadius: '0.2rem',
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
        style={{
          borderRadius: '0.3em',
        }}
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
            borderRadius: '0.25rem',
            outline: `1px dashed ${colorWithAlpha(theme.colors[theme.primaryColor][9], 0.8)}`
          }}
        />
        <CartItemInfo {...props} />
        <CartItemButtons {...props}/>
      </Flex>
    </Box>
  );
}
