import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../utils/colorWithAlpha";
import TornEdges from "./TornEdge";
import CustomFlex from "./CustomFlex";
import { useSettings } from "../../stores/settings";



type BorderedIconProps = {
  icon: string;
  color?: string;
  fontSize?: string;
  hovered?: boolean;
  hoverable?: boolean;
  greyed?: boolean;
  onClick?: () => void;
  ml?: string;
}

export default function BorderedIcon(props: BorderedIconProps){
  const theme = useMantineTheme();
  const game = useSettings((data) => data.game);
  return (
    <CustomFlex
      h='fit-content'
      p='1vh'
      bg={colorWithAlpha(props.color ? props.color : theme.colors[theme.primaryColor][7 as number], (props.hoverable ? (props.hovered ? 0.3 : 0.2) : 0.2))}   
      style={{
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)',
        borderRadius: theme.radius.xxs,
        outline: game === 'fivem' ? `0.2vh solid ${colorWithAlpha(props.color ? props.color : theme.colors[theme.primaryColor][9 as number], 0.8)}` : 'none',
      }} 
    >
      
      
      <FontAwesomeIcon
        icon={props.icon as IconName}
        onClick={props.onClick}
        
        color={colorWithAlpha(props.color ? props.color : theme.colors[theme.primaryColor][theme.primaryShade as number], props.hovered ? 0.9: 0.9)}
        style={{
          margin: '0.5vh',
          transition: 'all 0.2s ease-in-out',
          aspectRatio: '1/1', 
          fontSize: props.fontSize ? props.fontSize: '2.5vh',
          // borderRadius: theme.radius.xxs,
          filter: props.greyed ? 'grayscale(1)' : 'none',
          // border: `2px solid var(--mantine-primary-color-9)`,
          // outline: `0.2vh solid ${colorWithAlpha(props.color ? props.color : theme.colors[theme.primaryColor][9], 0.8)}`,
      
        }}
      />

    </CustomFlex>
  )
}