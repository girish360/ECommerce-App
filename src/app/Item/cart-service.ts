import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Item } from './item';
import { Headers, Http, RequestOptions } from '@angular/http';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable() export class CartService {

  private url = `api/Tables`;
  

  private headers = new Headers();
  public httpParams = new HttpParams().set('Content-Type', 'application/json');
  private options;

  constructor(public cart: Cart, private http: Http, private httpClient: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
  }

  verifyPurchase(): Promise<boolean> {
    return this.http.put(this.url, JSON.stringify(this.cart.items), this.headers)
      .toPromise()
      .then(res => res.json() as boolean);
  }
  getCartItems(): Item[] {
    return this.cart.items;
  }

  addItemToCart(item: Item) {
    this.http.post(this.url, JSON.stringify({ id: 3337, name: "fuckthisshit117", price: 1111, description: "PenileErection" }), this.options).subscribe();
    this.cart.items.push(item);
    this.updateTotalPrice();
  }

  addItemToCartNew(item: Item) {
    this.httpClient.post(this.url, JSON.stringify({ id: 3335, name: "fuckthisshit113", price: 10, description: "Penile" }), { headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe();
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
