import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../Item/cart-service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})

export class CheckoutComponent implements OnInit {
  ngOnInit(): void {

  }

  constructor(private _cartService: CartService) { }
  

  //make this server side
  //add viscilarity
  purchase() {
    if (this._cartService.cart.totalPrice < 0) {
      throw new Error("Negative total Price");
    }
    this._cartService.clearCart();
  }
}
