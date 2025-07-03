import { Flex } from "@mantine/core";
import { Title } from "../Generic/Title";
import { InfoBox } from "../Generic/InfoBox";
import { locale } from "../../stores/locales";
import { useStore } from "./useStore";
import { motion } from "framer-motion";
import SegmentedControl from "../Generic/SegmentedControl";

export default function Header() {
  const name = useStore((state) => state.name);
  const icon = useStore((state) => state.icon);
  const description = useStore((state) => state.description);
  const selectedMethod = useStore((state) => state.selectedMethod);
  console.log('selectedMethod', selectedMethod);
  const paymentMethods = useStore((state) => state.paymentMethods);
  return (
    <Flex
      w='100%'
      h='fit-content'
      align={'center'}
      // p='xs'
      gap='sm'
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
          marginRight: '5vh',
        }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1}}
        transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}

      >
        <SegmentedControl
          value={selectedMethod?.id || paymentMethods[0]?.id}
          items={paymentMethods.map((method) => ({
            label: method.name.toUpperCase(),
            value: method.id,
            icon: method.icon || 'fa-credit-card',
          }))}
          onChange={(value) => {
            console.log('Selected payment method:', value);
            useStore.setState({
              selectedMethod: paymentMethods.find(method => method.id === value) || paymentMethods[0],
            });
          }}
        />
      </motion.div>

      <motion.div
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