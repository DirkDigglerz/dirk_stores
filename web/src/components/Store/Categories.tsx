import { Flex, Text, useMantineTheme } from "@mantine/core";
import { CategoryProps, useStore } from "./useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useHover } from "@mantine/hooks";
import CustomFlex from "../Generic/CustomFlex";
import { useSettings } from "../../stores/settings";
import colorWithAlpha from "../../utils/colorWithAlpha";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function Categories(){
  const categories = useStore((state) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      useStore.setState({
        selectedCategory: undefined,
      });
    }
    // set the first category as selected
    if (!useStore.getState().selectedCategory) {
      useStore.setState({
        selectedCategory: categories[0].name,
      });
    }
  }, [categories]);

  return (
    <Flex
      flex={0.25}
      direction={'column'}
      gap='sm'
      p='xs'
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          // slide in from left and delay by 0.1s for each category
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeInOut' }}
        >
          <Category 
            {...category}
          />
        </motion.div>
      ))}
    </Flex>
  )
}

function Category(props:CategoryProps){
  const {hovered, ref} = useHover();
  const theme = useMantineTheme();
  const game = useSettings((data) => data.game);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const realHover = useMemo(() => {
    return hovered || selectedCategory === props.name;
  }, [hovered, selectedCategory, props.name]);
  return (
    <CustomFlex
      ref={ref}
      mah='10vh'
      bg={'rgba(77, 77, 77, 0.5)'}
      p={'sm'}
      pl={'md'}
      pr={'md'}
      style={{
        filter: realHover ? 'brightness(1.2)' : 'brightness(1)',
        cursor: 'pointer',
        borderRadius: theme.radius.xxs,
        outline: `0.2vh solid ${realHover ? colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.5) : 'transparent'}`,
        boxShadow: realHover ? `inset 0 0 5vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.5)}` : 'none',
        transition: 'all 0.2s ease-in-out',
      }}
      direction={'column'}
      onClick={() => useStore.setState({
        selectedCategory: props.name,
      })}

    >
      <Flex
        align={'center'}
        gap='xs'
      >
        <FontAwesomeIcon
          icon={props.icon as IconProp}
          style={{ 
            fontSize: theme.fontSizes.sm,

          }}
        />
        <Text
          fw={game === 'rdr3' ? 600 : 300}
          size='sm'
          style={{
            fontFamily: game === 'fivem' ? 'Akrobat Black' : 'Red Dead',
          }}
        >
          {props.name.toUpperCase()}
        </Text>
      </Flex>
      <Text
        size='xs'
        fw={600}
        c='rgba(255, 255, 255, 0.6)'
      >
        {props.description}
      </Text>
    </CustomFlex>
  )
}