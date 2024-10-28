export type StoreInfoProps = {
  name: string;
  hasCategories: boolean;
  description: string;
  type: 'sell' | 'buy';
  icon: string;
  canManage?: boolean;
  paymentMethods: {
    id: string;
    name: string;
    icon: string;
  }[];
}