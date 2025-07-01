import { Flex, Image, ImageProps, Text } from "@mantine/core";

type GlowImageProps = ImageProps & {
  alt?: string;
}

export default function GlowImage(props: GlowImageProps) {
  return (
    <Flex
      pos='relative'
    >
      <Image
        pos='absolute'
        style={{
          transform: 'translate(-50%, -50%)',
          // scale but use static value so it doesn't change with zoom
          width: '10vh',
          height: '12vh',
          filter: 'blur(50px)',
          zIndex: -1,
          opacity: 0.3,
          
        }}
        {...props}
      />
      <Image
        pos='absolute'
        
        style={{
          zIndex: -1,
        }}
        left={0}
          {...props}
      />
    </Flex>
  );
}