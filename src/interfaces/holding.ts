import { Cryptocurrency } from './cryptocurrency';

export interface Holding {
  cryptocurrency: Cryptocurrency;
  quantity: number;
  value: number;
  averageCost: number;
}
