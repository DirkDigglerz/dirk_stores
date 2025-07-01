import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";
import CustomFlex from "./CustomFlex";
import { useMemo } from "react";

type ButtonProps = {
  disabled?: boolean;
  text?: string;
  icon?: string;
  flex?: number;
  h?: string;
  w?: string;
  p?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mr?: string;
  mb?: string;
  mt?: string;
  ml?: string;
  bg?: string;
  selected?: boolean;
  radius?: string;
  onClick?: () => void;
  color?: string;
  hoverColor?: string;
  fontSize?: string;
  iconSize?: string;
  
  // style css properties 
  style?: React.CSSProperties;

}

export default function Button(props: ButtonProps) {
  const theme = useMantineTheme();
  const {hovered, ref} = useHover();
  const colors = {
    iconColor: {
      hovered: 'rgba(255,255,255,0.8)',
      normal: 'rgba(255,255,255,0.5)',
    },

    textColor: {
      hovered: 'rgba(255,255,255,0.8)',
      normal: 'rgba(255,255,255,0.5)',
    },

    borderColor: {
      hovered: colorWithAlpha(theme.primaryColor, 0.3),
      normal: theme.primaryColor,
    },
  }

  const realHover = useMemo(() => {
    return !props.disabled && (hovered || props.selected);
  }, [hovered, props.disabled, props.selected]);

  return (
    
    <CustomFlex
      ref={ref}
      flex={props.flex || 'unset'}
      w={props.w || 'fit-content'}
      h={props.h || 'fit-content'}
      mr={props.mr || '0'}
      mb={props.mb || '0'}
      mt={props.mt || '0'}
      ml={props.ml || '0'}
      

      
      bg={ !props.disabled && realHover ? colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.4) : 'rgba(66, 66, 66, 0.8)'}


      style={{
        borderRadius: props.radius || theme.radius.xxs,
        cursor: !props.disabled ? 'pointer' : 'not-allowed',
        padding: props.p || theme.spacing.xs,
        userSelect: 'none',
        transition: 'all 0.1s ease-in-out',
        ...props.style,
      }}
      align='center'
      justify='center'
      onClick={() => {
        if (props.onClick && !props.disabled) {
          props.onClick();
        }
      }}
    >
      {props.icon && (
        <FontAwesomeIcon icon={props.icon as IconName || 'fa-play'} style={{ 
            color: realHover && !props.disabled ? colors.iconColor.hovered : colors.iconColor.normal,
            fontSize: props.iconSize || theme.fontSizes.sm,
            transition: 'all 0.1s ease-in-out',
            aspectRatio: '1/1',
          }} 
          
        />

      )}

      {props.text && (
        <Text
          style={{
            color: !props.disabled && realHover ? colors.textColor.hovered : colors.textColor.normal,
            fontSize: props.fontSize || theme.fontSizes.sm,
            marginLeft: props.icon ? theme.spacing.xs : '0',
          }}
        >{props.text}</Text>
      )}

    </CustomFlex>
  )
}