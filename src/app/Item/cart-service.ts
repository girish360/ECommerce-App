import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Item } from './item';
import { Headers, Http } from '@angular/http';
@Injectable() export class CartService {
  
  

  constructor(public cart: Cart, private http: Http ) { }

  verifyPurchase(): Promise<boolean> {
    var url = `api/Tables`;
    var headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(this.cart.items));
    return this.http.put(url, JSON.stringify(this.cart.items), { headers })
      .toPromise()
      .then(res => res.json() as boolean);
  }
  getCartItems(): Item[] {
    return this.cart.items;
  }

  addItemToCart(item: Item) {
    this.cart.items.push(item);
    this.updateTotalPrice();
  }

  clearCart() {
    this.cart.items = new Array<Item>();
    this.updateTotalPrice();
  }

  deleteItemFromCart(item: Item) {
    var index = this.cart.items.indexOf(item, 0);
    if (index > -1) {
      this.cart.items.splice(index, 1);
    }

    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.cart.totalPrice = 0;
    for (let item of this.cart.items) {
      this.cart.totalPrice += item.price;
    }
    this.cart.totalPrice = +this.cart.totalPrice.toFixed(2);
  }
}
