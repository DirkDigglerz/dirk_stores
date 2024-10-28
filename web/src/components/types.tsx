export type MetadataProps = {
  [key: string | number]: unknown;
 }
 
 export type ItemProps = {
   listing_id: string;
 
   name: string;
   price: number;
   label: string;
   image: string; // url
   disableIcon?: string;
   disableMessage?: string;
   metadata: MetadataProps[];
   
   description?: string;
   category?: string;
   stock?: number;
 }
 
 export type CategoryProps = {
  name: string;
  icon: string;
  description: string; 
}

 
export type CartItemProps = {
  label: string;
  amount: number; 
  price: number;
  listing_id: string;
  image: string;
}