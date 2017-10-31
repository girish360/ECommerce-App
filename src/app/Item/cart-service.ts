import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Item } from './item';

@Injectable() export class CartService {
  
  

  constructor(public cart: Cart ) { }

  getCartItems(): Item[] {
    return this.cart.items;
  }

  addItemToCart(item: Item) {
    this.cart.items.push(item);
  }

  clearCart() {
    this.cart.items = new Array<Item>();
  }
}
