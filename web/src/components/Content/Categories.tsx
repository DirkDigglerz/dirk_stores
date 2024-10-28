import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useStore } from "../../providers/store/provider";
import colorWithAlpha from "../../utils/colorWithAlpha";
import { CategoryProps } from "../types";
import { useLocale } from "../../providers/locales/locales";
import Button from "../Main/Button";

type CategoriesProps = {
  category: string;
  setCategory: (category: string) => void;
};

type CategoryComponentProps = {
  selected: boolean;
  setCategory: (category: string) => void;

} & CategoryProps;

function Category(props: CategoryComponentProps) {
  const theme = useMantineTheme();
  const {store, funcs} = useStore();
  const {hovered, ref} = useHover();
  return (
    <Flex
      ref={ref}
      align='center'
      bg={props.selected || hovered ? colorWithAlpha(theme.colors[theme.primaryColor][9], 0.4) : 'rgba(66, 66, 66, 0.5)'}
      w='100%'
      p='sm'
      gap='sm'
      style={{
        cursor: 'pointer',
        transition: 'all ease-in-out 0.1s',
        borderRadius: '0.25rem',
        outline: !props.selected && hovered ? `2px solid var(--mantine-primary-color-9)` : props.selected ? 
        `1px dashed ${theme.colors[theme.primaryColor][9]}` : 'none',
      }}
      onClick={() => props.setCategory(props.name)}
    >
      <FontAwesomeIcon icon={props.icon as IconName} 
        color = {props.selected || hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'}
        style={{
          transition: 'all ease-in-out 0.1s',
          fontSize: '2vh',
        }}
      />
      <Flex
        direction='column'
        gap='0.25vh'
      >
        <Text
          size='1.8vh'
          
          style={{
            userSelect: 'none',
            fontFamily: 'Akrobat Bold'
          }}
        >{props.name.toUpperCase()}</Text>
        <Text size='1.6vh' c='grey'>{props.description}</Text>

      </Flex>

      {store.canManage && props.selected && (
        <Button
          ml='auto'
          icon='trash'
          fontSize='0.9em'
          hoverColor={colorWithAlpha(theme.colors.red[6], 0.8)}
          onClick={() => funcs.removeCategory(props.name)}
        /> 
      )}
    
    </Flex>
  );
}


export function Categories(props: CategoriesProps) {
  const {categories, store} = useStore();
  return store.hasCategories && (
    <Flex
      direction={'column'}
      align='center'
      flex={0.3}
      gap='xs'
      p='xs'
    >
      {categories.map((category) => (
        <Category {...category} selected = {category.name === props.category} key={category.name} setCategory={props.setCategory} />
      ))}

      {store.canManage && (
        <AddCategory />
      )}
    </Flex>
  );
}

function AddCategory(){
  const theme = useMantineTheme();
  const locale = useLocale();
  const {hovered, ref} = useHover();
  return (
    <Flex
      ref={ref}
      align='center'
      bg={ hovered ? colorWithAlpha(theme.colors[theme.primaryColor][9], 0.4) : 'rgba(66, 66, 66, 0.5)'}
      w='100%'
      p='sm'
      gap='sm'
      style={{
        cursor: 'pointer',
        transition: 'all ease-in-out 0.1s',
        borderRadius: '0.25rem',
        outline: hovered ? `2px solid var(--mantine-primary-color-9)`: 'none',
      }}
    >
      <FontAwesomeIcon icon='plus'  
        color = {hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'}
        style={{
          transition: 'all ease-in-out 0.1s',
          fontSize: '2vh',
        }}
      />

      <Flex
        direction='column'
        gap='0.25vh'
      >
        <Text
          size='1.8vh'
          style={{
            userSelect: 'none',
            fontFamily: 'Akrobat Bold'
          }}
        >{locale('AddCategory')}</Text>
        <Text size='1.6vh' c='grey'>{locale('AddCategoryDesc')}</Text>
      </Flex>
    </Flex>
  )
}
