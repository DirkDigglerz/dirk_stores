import React from 'react';
import { Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colorWithAlpha from '../../../utils/colorWithAlpha';

type CenterIconWrapperProps = {
  icon?: IconName | string;
  children: React.ReactNode;
  message?: string;
  hovered?: boolean;
  inCart?: boolean;
};

export default function CenterIconWrapper(props: CenterIconWrapperProps) {
  const theme = useMantineTheme();
  return (
    <Box style={{ position: 'relative', width: '100%', height: 'fit-content', outline: 
      props.icon || props.inCart ?`1px dashed ${theme.colors[theme.primaryColor][9]}` : props.hovered ? `1px solid ${theme.colors[theme.primaryColor][9]}` 
      : 'none'
      
      ,
      transition: 'all ease-in-out 0.1s',
      borderRadius: theme.radius.xs, overflow: 'hidden'
    }}>
      {/* Wrapped content */}
      {props.children}

      {/* Centered icon */}
      <Flex
        justify="center"
        align="center"
        style={{
          position: 'absolute',
          top: '12vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999, // Ensure it stays above other elements
          pointerEvents: 'none', // Prevent icon from blocking interaction with underlying content
        }}
        direction={'column'}
        gap='xs'
        w='100%'
      >
        {props.icon && (
          <>
            <FontAwesomeIcon icon={props.icon as IconName || 'fas fa-cart'} size="2x" 
              style={{
                border: `2px solid ${theme.colors[theme.primaryColor][9]}`,
                backgroundColor: colorWithAlpha(theme.colors[theme.primaryColor][9], 0.5),
                padding: '0.35rem',
                borderRadius: theme.radius.xs,
              }}
            />
            <Text
              p='0.25rem' 
              ta='center'
              w='75%'
              bg={colorWithAlpha(theme.colors[theme.primaryColor][8], 0.4)}
              c='lightgrey'
            
              style={{
                border: `2px solid ${theme.colors[theme.primaryColor][9]}`,
                borderRadius: theme.radius.xs,
                fontFamily: 'Akrobat Bold',
              }}
            >{props.message}</Text> 
          </>
        )}
      </Flex>
    </Box>
  );
}
