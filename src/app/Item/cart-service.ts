import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Item } from './item';

import { CartItem } from './cart-item'
import { Headers, Http, RequestOptions } from '@angular/http';
import { ItemService } from './item-service';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable() export class CartService {

  private url = `api/Tables`;
  private cartUrl = `api/Carts`

  private headers = new Headers();
  public httpParams = new HttpParams().set('Content-Type', 'application/json');
  private options;

  constructor(public cart: Cart, private http: Http, private httpClient: HttpClient, private _itemService: ItemService){
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({ headers: this.headers });
    this.getAllItems().then(x => this.cart.cartItems = x);
  }

  verifyPurchase(): Promise<boolean> {
    return this.http.put(this.cartUrl, this.headers)
      .toPromise()
      .then(res => res.json() as boolean).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getCartItems(): Item[] {
    return this.cart.items;
  }

  getAllItems(): Promise<CartItem[]> {
    return this.http.get(this.cartUrl)
      .toPromise()
      .then(x => x.json() as CartItem[])
      .catch(this.handleError);
  }

  addItemToCart(item: Item) {
    this.http.post(this.cartUrl, JSON.stringify({ name: item.name, itemId: item.id }), this.options).subscribe();
    this.cart.items.push(item);
    this.updateTotalPrice();
  }

  /*
  addItemToCartNew(item: Item) {
    this.httpClient.post(this.url, JSON.stringify({ id: 3335, name: "fuckthisshit113", price: 10, description: "Penile" }), { headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe();
    this.cart.items.push(item);
    this.updateTotalPrice();
  }
  */

  
  clearCart() {
    for (let cartItem of this.cart.items) {
      const deleteUrl = `${this.cartUrl}/${cartItem.name}`;
      this.http.delete(deleteUrl, this.headers).subscribe();
    }
    this.cart.items = new Array<Item>();
    this.updateTotalPrice();
  }

  deleteItemFromCart(item: Item) {
    const deleteUrl = `${this.cartUrl}/${item.name}`;
    this.http.delete(deleteUrl, this.headers).subscribe();
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
