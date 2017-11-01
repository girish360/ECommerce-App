import { Item } from './item';

export class Cart {

  public items: Item[];
  public totalPrice: number = 0;

  constructor() {
    this.items = [];
  }
}
