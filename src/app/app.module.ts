import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { Cart } from './Item/cart';
import { CartService } from './Item/cart-service';
import { ItemService } from './Item/item-service';
import { AppRoutingModule } from './app-routing.module';
import { ItemListComponent } from './ItemList/itemlist.component';
import { CheckoutComponent } from './Checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  //?????????????????
  providers: [ItemService, CartService, Cart],
  bootstrap: [AppComponent]
})
export class AppModule { }
