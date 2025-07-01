import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import BorderedIcon from "./BorderedIcon";
import Button from "./Button";
import { useSettings } from "../../stores/settings";

type TitleProps = {
  h?: string;
  title: string
  description: string;
  icon: string;
  backButton?: boolean;
  flashWeight?: boolean;
  progress?: number;
  onBack?: () => void;
};

export function Title(props: TitleProps) {
  
  // if (props.flashWeight) { then make the description color flash red }
  const game = useSettings((data) => data.game);
  const [descriptionColor, setDescriptionColor] = useState(props.flashWeight ? 'rgba(255,0,0,0.3)' : 'rgba(255,255,255,0.3)');
  
  useEffect(() => {
    if (props.flashWeight) {
      const interval = setInterval(() => {
        setDescriptionColor(descriptionColor === 'rgba(255,0,0,0.3)' ? 'rgba(255,255,255,0.3)' : 'rgba(255,0,0,0.3)');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [props.flashWeight, descriptionColor]);

  return (
    <Flex
      align='center'
      gap='sm'
      p='xs'
      
      h={props.h || 'fit-content'}
    >
      {props.backButton && (
        <>
          <Button icon='fa-arrow-left' onClick={props.onBack} />
        </>

      )}
      <BorderedIcon 
        icon={props.icon as IconName}
      />
      <Flex
        direction='column'
      >

        <Text
          size='sm'
          style={{
            // lineHeight: '0.8vh',
            fontFamily: game == 'fivem' ? 'Akrobat Bold': 'Red Dead',
          }}
        >{props.title.toUpperCase()}</Text>
        <Text
          c={descriptionColor}
          size='xs'
        >
          {props.description}
        </Text>
      </Flex>
    </Flex>
  );
}
