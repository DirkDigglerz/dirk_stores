import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { CategoryProps } from "../types";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";

type CategoriesProps = {
  categories: CategoryProps[];
  category: string;
  setCategory: (category: string) => void;
};

type CategoryComponentProps = {
  selected: boolean;
  setCategory: (category: string) => void;

} & CategoryProps;

function Category(props: CategoryComponentProps) {
  const theme = useMantineTheme();
  const {hovered, ref} = useHover();
  return (
    <Flex
      ref={ref}
      align='center'
      bg={props.selected || hovered ? colorWithAlpha(theme.colors[theme.primaryColor][9], 0.4) : 'rgba(66, 66, 66, 0.5)'}
      w='100%'
      p='xs'
      gap='xs'
      style={{
        cursor: 'pointer',
        transition: 'all ease-in-out 0.1s',
        borderRadius: theme.radius.xs,
        outline: !props.selected && hovered ? `2px solid var(--mantine-primary-color-9)` : props.selected ? 
        `1px dashed ${theme.colors[theme.primaryColor][9]}` : 'none',
      }}
      onClick={() => props.setCategory(props.name)}
    >
      <FontAwesomeIcon icon={props.icon as IconName} />
      <Flex
        direction='column'
      >
        <Text
          size='sm'
          style={{
            userSelect: 'none',
            fontFamily: 'Akrobat Bold'
          }}
        >{props.name.toUpperCase()}</Text>
        <Text size='xs' c='grey'>{props.description}</Text>

      </Flex>
    
    </Flex>
  );
}
export function Categories(props: CategoriesProps) {
  return (
    <Flex
      direction={'column'}
      align='center'
      flex={0.3}
      gap='xs'
      p='xs'
    >
      {props.categories.map((category) => (
        <Category {...category} selected = {category.name === props.category} key={category.name} setCategory={props.setCategory} />
      ))}
    </Flex>
  );
}
