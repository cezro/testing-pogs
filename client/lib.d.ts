import { colorVariants } from "./colorVariants";

type PogsCreationFormProps = {
  name: string;
  ticker_symbol: string;
  price: string | number;
  color: string;
};

interface DataPogs {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: keyof typeof colorVariants;
  createdat: string;
}
