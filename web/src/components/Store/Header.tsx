import { Flex } from "@mantine/core";
import { motion } from "framer-motion";
import { locale } from "../../stores/locales";
import Button from "../Generic/Button";
import SegmentedControl from "../Generic/SegmentedControl";
import { Title } from "../Generic/Title";
import { useStore } from "./useStore";
import { fetchNui } from "../../utils/fetchNui";

export default function Header() {
  const name = useStore((state) => state.name);
  const icon = useStore((state) => state.icon);
  const description = useStore((state) => state.description);
  const selectedMethod = useStore((state) => state.selectedMethod);
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
          gap='xxs'
          value={selectedMethod?.id || paymentMethods[0]?.id}
          items={paymentMethods.map((method) => ({
            label: selectedMethod?.id === method.id ? `${method.name} - (${method.symbol}${method.balance})` : method.name,
            value: method.id,
            icon: method.icon || 'fa-credit-card',
          }))}
          onChange={(value) => {
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
        <Button
          icon='xmark'
          size='md'
          onClick={() => {
            fetchNui('CLOSE_STORE');
          }}
        />
      </motion.div>
    </Flex>
  )
}