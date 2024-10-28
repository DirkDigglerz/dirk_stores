import { Flex } from "@mantine/core";
import { StoreName } from "./StoreName";
import { InfoBox } from "./InfoBox";
import { useLocale } from "../../providers/locales/locales";
import { useStore } from "../../providers/store/provider";



export function Header() {

  const {store} = useStore();
  const locale = useLocale();
  return (
    <Flex
      justify='space-between'
      align={'center'}
      w='100%'
      p='xs'
    >
      <StoreName storeName={store.name} storeInfo={store.description} icon={store.icon} />
      <InfoBox leftSide={locale('ESCAPE')} rightSide={locale('CLOSE')} />
    </Flex>
  );
}
