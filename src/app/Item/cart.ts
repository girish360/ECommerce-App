import { Item } from './item';
import { CartItem } from './cart-item';
export class Cart {

  public items: Item[];
  public cartItems: CartItem[];
  public totalPrice: number = 0;

  constructor() {
    this.items = [];
    this.cartItems = [];
  }
}
