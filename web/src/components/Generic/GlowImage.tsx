import { Flex, Image, ImageProps } from "@mantine/core";
import NothingPNG from '../Store/nothing.png';
type GlowImageProps = ImageProps & {
  alt?: string;
}

export default function GlowImage(props: GlowImageProps) {
  return (
    <Flex
      w='fit-content'
      pos='absolute'
      // w='12vh'
      // bg='blue'
      h='12vh'
      top='40%'
      left='50%'
      justify='center'
      align='center'
      style={{
        // aspectRatio: '1 / 1',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Image
        // w='12vh'
        h='12vh'
        // bg='red'
        style={{

          // scale but use static value so it doesn't change with zoom

          // filter: 'blur(50px)',
          zIndex: 2,
          opacity: 1,
          
        }}
        src={props.src}
        fallbackSrc={NothingPNG}
        alt={props.alt || 'Glow Image'}
      />
      <Image
        pos='absolute'
        // w='16vh'
        h='18vh'
        // bg='green'
        style={{
          // scale but use static value so it doesn't change with zoom

          filter: 'blur(1.5vh)',
          zIndex: 1,
          opacity: 0.4,
          
        }}
        src={props.src}
        fallbackSrc={NothingPNG}
        alt={props.alt || 'Glow Image'}
      />
    </Flex>
  );
}