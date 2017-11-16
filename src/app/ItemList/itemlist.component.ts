import { Component, OnInit } from '@angular/core';



import { Item } from '../Item/item';
import { ItemService } from '../Item/item-service';
import { AppComponent } from '../app.component'
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Cart } from '../Item/cart';
import { CartService } from '../Item/cart-service';

@Component({
  selector: 'itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
})

export class ItemListComponent implements OnInit {

  items: Item[];
  selectedItem: Item;
  selectedCartItem: Item;
  //add a method to get the price
  cartItems: Item[];
  constructor(
    private _cartService: CartService,
    private _itemService: ItemService, private _appComponent: AppComponent, private router: Router) {
    this.matchCartItems();
  }

  ngOnInit() {
    this._itemService.getItems().then(x => this.items = x);
  }

  onSelect(item: Item) {
    this.selectedItem = item;
  }

  add(item: Item) {
    this._cartService.addItemToCart(item);
  }

  onSelectCart(item: Item) {
    this.selectedCartItem = item;
  }

  deleteCart(item: Item) {
    this.selectedCartItem = null;
    this._cartService.deleteItemFromCart(item);
  }

  //deprecated
  matchCartItems() {
    for (let cartItem of this._cartService.cart.cartItems) {
      console.log(cartItem);
      for (let item of this._itemService.getItemList()) {
        if (cartItem.itemId == item.id) {
          this.cartItems.push(item);
          this._cartService.cart.items.push(item);
        }
      }
    }
  }
}
