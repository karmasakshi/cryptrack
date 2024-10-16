import { Cryptocurrency } from './cryptocurrency';

export interface Portfolio {
  holdings: Cryptocurrency[];
  value: number;
}
