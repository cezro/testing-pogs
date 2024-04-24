import { colorVariants } from "./colorVariants";

type PogsCreationFormProps = {
  name: string;
  ticker_symbol: string;
  price: string | number;
  color: string;
};

interface DataPogs {
  prev_value: number;
  id: number;
  name: string;
  ticker_symbol: string;
  value: number;
  color: keyof typeof colorVariants;
  createdat: string;
}

interface PogDataForm {
  id: number;
  name: string;
  ticker_symbol: string;
  price: number;
  color: string;
}
