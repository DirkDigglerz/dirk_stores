import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";

type ButtonProps = {
  disabled?: boolean;
  text?: string;
  icon?: string;
  h?: string;
  w?: string;
  p?: string;
  bg?: string;
  radius?: string;
  onClick?: () => void;
  color?: string;
  ml?: string;
  hoverColor?: string;
  fontSize?: string;
  iconSize?: string;

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

  return (
    <Flex
      ref={ref}
      ml={props.ml || '0'}
      w={props.w || 'fit-content'}
      h={props.h || 'fit-content'}
      bg={ !props.disabled && hovered ? colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.4) : 'rgba(122, 122, 122, 0.5)'}
     
      style={{
        borderRadius: props.radius || '0.25em',
        cursor: !props.disabled ? 'pointer' : 'not-allowed',
        padding: props.p || '0.5rem',
        outline: !props.disabled && hovered? `0.1rem solid ${colorWithAlpha(props.hoverColor || theme.colors[theme.primaryColor][9], 0.8)}`: "0.25rem solid transparent",
        transition: 'all 0.1s ease-in-out',
      }}
      align='center'
      justify='center'
      onClick={() => !props.disabled && props.onClick && props.onClick()}
    >
      {props.icon && (
        <FontAwesomeIcon icon={props.icon as IconName || 'fa-play'} style={{ 
          color: hovered && !props.disabled ? colors.iconColor.hovered : colors.iconColor.normal,
          fontSize: props.fontSize || '1.8vh',
        }}/>
      )}

      {props.text && (
        <Text
          style={{
            fontFamily: 'Akrobat Bold',
            color: !props.disabled && hovered ? colors.textColor.hovered : colors.textColor.normal,
            fontSize: props.fontSize || '1.8vh',
            marginLeft: props.icon ? '0.5rem' : '0',
          }}
        >{props.text}</Text>
      )}

    </Flex>
  )
}