import { Holding } from './holding';

export interface Portfolio {
  holdings: Holding[];
  value: number;
}
