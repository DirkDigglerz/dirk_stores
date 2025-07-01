import { Flex, FlexProps, Transition, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSettings } from '../../stores/settings';

type BackgroundProps = {
  children: React.ReactNode;
  escapeKey?: boolean;
  onClose?: () => void;
  open?: boolean;
} & FlexProps;

export default function Background(props: BackgroundProps) {
  const theme = useMantineTheme();
  const background = useSettings((state) => state.background);
  const primaryColor = theme.colors[theme.primaryColor];
  // Create a subtle gradient with the primary color
  const gradientBackground = `
  linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
  linear-gradient(135deg, ${primaryColor[9]}30 0%, ${primaryColor[9]}60 100%)
`;


  const [pointerEvents, setPointerEvents] = useState<boolean>(true);


  
  // escape key close 
  useEffect(() => {
    if (!props.escapeKey) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (props.onClose) {
          props.onClose();
        }
      }
    }
    document.addEventListener('keyup', handleKeyDown);
    return () => {
      document.removeEventListener('keyup', handleKeyDown);
    }
  }, [props]);

  return ( 
    <Transition
      duration={500}
      timingFunction="ease"
      transition="fade"
      mounted={!!props.open}
      onEntered={() => setPointerEvents(true)}
      onExited={() => setPointerEvents(false)}
    > 
      {(transition) => (
      <Flex
        direction='column'
        bg={background == 'dark' ? 'rgba(0, 0, 0, 0.9)'
          : background == 'themed' ? gradientBackground :
          background == 'transparent' ? 'transparent' : `rgba(0, 0, 0, 0.9)`
        }
        w='100dvw'
        maw='100dvw'
        mih='100dvh'
        mah='100dvh'
        style={{
          pointerEvents: pointerEvents ? 'all' : 'none',
          userSelect: 'none',
          overflow: 'hidden',
          ...transition,
        }}
        {...props}
        >
          {props.children}
        </Flex>
      )}
    </Transition>
  )
}
