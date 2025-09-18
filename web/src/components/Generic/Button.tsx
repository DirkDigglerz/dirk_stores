import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useMemo } from "react";
import colorWithAlpha from "../../utils/colorWithAlpha";
import { MotionFlex } from "../App";
import { motion, Variants } from "framer-motion";
import { useSettings } from "../../stores/settings";

export type ButtonProps = {
  label?: string;
  icon?: string;
  color?: string; // Can be any valid CSS color
  onClick?: () => void;
  disabled?: boolean;
  flex?: number;
  size?: string;
  ml?: string | number;
}

// Helper function to parse any color format and generate color variations
function parseColor(color: string): { r: number, g: number, b: number } {
  // Handle rgba/rgb format
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3])
    };
  }
  
  // Handle hex format
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16)
    };
  }
  
  // Fallback for named colors - create a temporary element to get computed color
  const tempDiv = document.createElement('div');
  tempDiv.style.color = color;
  document.body.appendChild(tempDiv);
  const computedColor = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);
  
  const computedMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (computedMatch) {
    return {
      r: parseInt(computedMatch[1]),
      g: parseInt(computedMatch[2]),
      b: parseInt(computedMatch[3])
    };
  }
  
  // Default fallback
  return { r: 66, g: 135, b: 245 }; // Blue fallback
}

// Generate color variations based on a base color
function generateColorVariations(baseColor: string) {
  const { r, g, b } = parseColor(baseColor);
  
  return {
    base: `rgb(${r}, ${g}, ${b})`,
    light: `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`,
    lighter: `rgb(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)})`,
    dark: `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`,
    darker: `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`,
  };
}

export default function Button(props: ButtonProps) {
  const theme = useMantineTheme()
  const game = useSettings((state) => state.game);

  // Generate color scheme based on props.color or theme default
  const colorScheme = useMemo(() => {
    if (props.color) {
      return generateColorVariations(props.color);
    }
    // Default to theme primary color
    return {
      base: theme.colors[theme.primaryColor][6],
      light: theme.colors[theme.primaryColor][5],
      lighter: theme.colors[theme.primaryColor][4],
      dark: theme.colors[theme.primaryColor][7],
      darker: theme.colors[theme.primaryColor][8],
    };
  }, [props.color, theme.colors, theme.primaryColor]);

  const bodyColor = useMemo(() => {
    return props.color 
      ? colorWithAlpha(colorScheme.base, 0.15)
      : 'rgba(38, 38, 38, 0.35)';
  }, [props.color, colorScheme.base])

  const outlineColor = useMemo(() => {
    if (props.disabled) {
      return 'rgba(49, 49, 49, 0.3)';
    }
    return props.color 
      ? colorWithAlpha(colorScheme.dark, 0.4)
      : 'rgba(49, 49, 49, 0.6)';
  }, [props.disabled, props.color, colorScheme.dark])

  const glowColor = useMemo(() => {
    return props.color 
      ? colorWithAlpha(colorScheme.base, 0.3)
      : colorWithAlpha(theme.colors[theme.primaryColor][6], 0.5);
  }, [props.color, colorScheme.base, theme.colors, theme.primaryColor])

  const disabledBodyColor = useMemo(() => {
    return 'rgba(38, 38, 38, 0.15)'
  }, [])

  const hoverOutlineColor = useMemo(() => {
    return props.color 
      ? colorWithAlpha(colorScheme.base, 0.6)
      : colorWithAlpha(theme.colors[theme.primaryColor][8], 0.8);
  }, [props.color, colorScheme.base, theme.colors, theme.primaryColor])

  const hoverBgColor = useMemo(() => {
    return props.color 
      ? colorWithAlpha(colorScheme.base, 0.08)
      : colorWithAlpha(theme.colors[theme.primaryColor][9], 0.15);
  }, [props.color, colorScheme.base, theme.colors, theme.primaryColor])

  const hoverGlowColors = useMemo(() => {
    if (props.color) {
      return {
        inner: colorWithAlpha(colorScheme.base, 0.2),
        mid: colorWithAlpha(colorScheme.light, 0.15),
        outer: colorWithAlpha(colorScheme.base, 0.2)
      };
    }
    return {
      inner: colorWithAlpha(theme.colors[theme.primaryColor][5], 0.35),
      mid: colorWithAlpha(theme.colors[theme.primaryColor][4], 0.25),
      outer: colorWithAlpha(theme.colors[theme.primaryColor][6], 0.3)
    };
  }, [props.color, colorScheme, theme.colors, theme.primaryColor])

  const tapGlowColors = useMemo(() => {
    if (props.color) {
      return {
        inner: colorWithAlpha(colorScheme.darker, 0.6),
        outer: colorWithAlpha(colorScheme.base, 0.4)
      };
    }
    return {
      inner: colorWithAlpha(theme.colors[theme.primaryColor][7], 0.6),
      outer: colorWithAlpha(theme.colors[theme.primaryColor][6], 0.4)
    };
  }, [props.color, colorScheme, theme.colors, theme.primaryColor])

  const fontSize = useMemo(() => {
    if (props.size && theme.fontSizes[props.size as keyof typeof theme.fontSizes]) {
      return theme.fontSizes[props.size as keyof typeof theme.fontSizes];
    }
    return props.size || theme.fontSizes.xxs;
  }, [props.size, theme])

  // Icon shake animation variants
  const iconVariants: Variants = {
    idle: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: [0, -10, 10, 0],
      scale: 1.1,
      transition: {
        rotate: {
          duration: 0.6,
          ease: "easeInOut",
        },
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        }
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 30,
      }
    }
  };
  return (
    <MotionFlex
      flex={props.flex}
      bg={props.disabled ? disabledBodyColor : bodyColor}
      p='xs'
      ml={props.ml}
      align='center'
      justify='center'
      style={{
        aspectRatio: !props.label ? '1 / 1' : undefined,
        cursor: !props.disabled ? 'pointer' : 'not-allowed',
        outline: `0.15vh solid ${outlineColor}`,
        borderRadius: theme.radius.xxs,
        color: props.disabled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        ...(game === "rdr3" ? 
        {
            WebkitMaskImage: "url(https://raw.githubusercontent.com/Jump-On-Studios/RedM-jo_libs/af7545b6840972aa403287280346bbd1b8c443aa/source-repositories/Menu/public/assets/images/background.png)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            WebkitMaskComposite: "source-in",
        } : {}),
      }}

      initial={{
        boxShadow: 'inset 0 0 0vh rgba(0, 0, 0, 0)',
      }}

      whileHover={!props.disabled ? {
        outline: `0.18vh solid ${hoverOutlineColor}`,
        backgroundColor: hoverBgColor,
        boxShadow: [
          `inset 0 0 0.8vh ${glowColor}`,
          `inset 0 0 2vh ${hoverGlowColors.inner}`,
          `0 0 1.5vh ${hoverGlowColors.outer}` // Reduced external glow
        ].join(', '),
        scale: 1.01, // Reduced scale
        y: -0.5, // Reduced movement
      } : {}}

      whileTap={!props.disabled ? {
        scale: 0.98,
        y: 0,
        boxShadow: [
          `inset 0 0 0.8vh ${tapGlowColors.inner}`,
          `inset 0 0 2vh ${tapGlowColors.outer}`
        ].join(', '),
      } : {}}

      transition={{
        duration: 0.15,
        ease: 'easeOut',
      }}

      onClick={!props.disabled ? props.onClick : undefined}
    >
      {/* Background glow effect */}
      {!props.disabled && (
        <MotionFlex
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, ${colorWithAlpha(props.color ? colorScheme.base : theme.colors[theme.primaryColor][6], 0.06)} 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Content */}
      <Flex
        align='center'
        justify='center'
        gap={props.icon && props.label ? 'xs' : 0}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        {props.icon && 
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover={!props.disabled ? "hover" : "initial"}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <FontAwesomeIcon
              icon={props.icon as IconProp}
              style={{
                fontSize: fontSize,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </motion.div>
        }
        {props.label && 
          <Text
            size={fontSize}
            style={{
              fontFamily: 'Akrobat Bold',
              textShadow: !props.disabled ? '0 0 1vh rgba(255, 255, 255, 0.3)' : 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: props.disabled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              margin: 0,
              padding: 0,
            }}
          >{props.label}</Text>
        }
      </Flex>
    </MotionFlex>
  )
}