import { Flex } from "@mantine/core";
import { Title } from "../Generic/Title";
import { InfoBox } from "../Generic/InfoBox";
import { locale } from "../../stores/locales";
import { useStore } from "./useStore";
import { motion } from "framer-motion";

export default function Header() {
  const name = useStore((state) => state.name);
  const icon = useStore((state) => state.icon);
  const description = useStore((state) => state.description);
  return (
    <Flex
      w='100%'
      h='fit-content'
      align={'center'}
      // p='xs'
    >
      <motion.div
        // slide in from left 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1}}
        // delay 
        transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
      
      >
        <Title
          title={name || locale('Store')}
          description={description || locale('A hidden store for illegal items and services.')}
          icon={icon || 'fa-store'}
        />

      </motion.div>
      
      <motion.div
        style={{
          marginLeft: 'auto',
        }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1}}
        transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
      >
        <InfoBox
          leftSide={locale('Close').toUpperCase()}
          rightSide={locale('Escape').toUpperCase()}
          />
  
      </motion.div>
    </Flex>
  )
}