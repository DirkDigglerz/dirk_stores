import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import colorWithAlpha from "../../utils/colorWithAlpha";
import BorderedIcon from "./BorderedIcon";



type ToggleSideProps = {
  side: 'left' | 'right';
  icon: string;
  selectedSide: 'left' | 'right';
  onClick: () => void;
};

function ToggleSide(props:ToggleSideProps){
  const theme = useMantineTheme();
  const {hovered, ref} = useHover();

  

  return (
    <Flex
      h='100%'
      ref={ref}
      p='xs'
      bg={props.selectedSide == props.side ? colorWithAlpha(theme.colors[theme.primaryColor][8], 0.4) : 'rgba(77, 77, 77, 0.6)'}
      direction='column'  
      align='center'
      style={{
        boxShadow: 'inset 0 0 1vh rgba(0,0,0,0.6)',
        cursor: 'pointer',
        transition: 'all ease-in-out 0.1s',
        filter: props.selectedSide == props.side || hovered ? 'brightness(1)' : 'brightness(1)',

      }}
      onClick={props.onClick}
    >
      <BorderedIcon 
        icon={props.icon as IconName}
        hoverable
        hovered={props.selectedSide == props.side || hovered}
        greyed={props.selectedSide != props.side && !hovered}
      />
    </Flex>    
  )
}

type ToggleBoxProps = {
  leftSideIcon: string;
  leftSideOnClick?: () => void;

  rightSideIcon: string;
  rightSideOnClick?: () => void;

  selectedSide: 'left' | 'right';

  displayText?: string;
  displayDescription?: string;
};

export function ToggleBox(props: ToggleBoxProps) {
  return (
    <Flex
      mih="7vh"

      gap='sm'
      align='center'
    >
      <Flex
        align='center'
        w='fit-content'
        style={{
          borderRadius: '0.2vh',
          // filter: 'brightness(0.9)',
          border: `0.2vh solid rgba(77, 77, 77, 0.6)`,
        }}
        
      >
        <ToggleSide side='left' icon={props.leftSideIcon} selectedSide={props.selectedSide} onClick={props.leftSideOnClick || (() => {})} />
        <ToggleSide side='right' icon={props.rightSideIcon} selectedSide={props.selectedSide} onClick={props.rightSideOnClick || (() => {})} />
      </Flex>
      <Flex
        direction={'column'}
      >
        <Text
          size='sm'
          style={{
            fontFamily: 'Akrobat Bold',
          }}
        >{props.displayText}</Text>
        <Text
          c='rgba(255,255,255,0.3)'
          size='xs'
        >
          {props.displayDescription}
        </Text>

      </Flex>
    </Flex> 
  );
}
