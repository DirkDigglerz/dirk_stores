"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, FlexProps, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";


type SegmentProps = {
  label: string;
  value: string;
  icon?: string; // Optional icon for the segment
}

type SegmentedControlProps = {
  multi?: boolean; // Optional prop to allow multiple selections
  value?: string | string[]; // Controlled value, if provided
  onChange?: (value: string | string[]) => void; // Callback for value change
  items: SegmentProps[];
} & FlexProps;


export default function SegmentedControl(props: SegmentedControlProps) {
  const [value, setValue] = useState<string | string[]>(props.value || props.items[0].value);

  const handleChange = (newValue: string | string[]) => {
    if (props.onChange) {
      props.onChange(newValue);
    }
    setValue(newValue);
  };

  return (
    <Flex
      // bg='red'
      {...props}
    >
      {props.items.map((item, index) => (
        <motion.div
          key={index}
          // slide in from left and delay by 0.1s for each category
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Segment
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
  
            selected={!props.multi ? value === item.value : Array.isArray(value) && value.includes(item.value)}
            onClick={() => {
              if (props.multi) {
                const newValue = Array.isArray(value)
                  ? value.includes(item.value)
                    ? value.filter((v) => v !== item.value) // Remove if already selected
                    : [...value, item.value] // Add if not selected
                  : [item.value]; // Start a new selection

                handleChange(newValue);
              } else {
                handleChange(item.value);
              }
            }}
          />
        </motion.div>
      ))}
    </Flex>
  )
}


function Segment(props: SegmentProps & {
  selected: boolean;
  onClick: () => void;
}) {
  const {hovered, ref} = useHover();
  const theme = useMantineTheme();

  const realHover = useMemo(() => props.selected || hovered, [props.selected, hovered]);

  return (
    <Flex
      ref={ref}
      pb="xxs"
      direction="column"
      align="center"
      miw="7.5vh"
      pos="relative"
      style={{
        cursor: "pointer",
      }}
      onClick={props.onClick}
    >



      <motion.div
        animate={{
          color: props.selected ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.8)",
          scale: props.selected ? 1.05 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}

        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.xs,

        }}
      >
        {props.icon && (
          <FontAwesomeIcon
            icon={props.icon as IconProp}
            style={{
              fontSize:theme.fontSizes.xs,
              aspectRatio: "1 / 1",
              color: props.selected ? theme.colors[theme.primaryColor][9] : "rgba(255,255,255,0.8)",
              transition: "color 0.2s ease, transform 0.2s ease",
              transform: props.selected ? "scale(1.1)" : "scale(1)",
            }}
          />
        )}
        <Text
          w="100%"
          ta="center"
          size="xs"
          fw={600}
          style={{ color: 'inherit' }}
        >
          {props.label.toUpperCase()}
        </Text>


      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "0.3vh",
          pointerEvents: "none",
          background: `linear-gradient(to right, transparent, ${theme.colors[theme.primaryColor][9]}, transparent)`,
        }}
        animate={{
          opacity: realHover ? 1 : 0.2,
          scaleY: props.selected ? 1.5 : 1,
          height: "0.2vh",
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut"
        }}
      />
    </Flex>
  );
}