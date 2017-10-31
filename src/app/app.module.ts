import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { Cart } from './Item/cart';
import { CartService } from './Item/cart-service';
import { ItemService } from './Item/item-service';
import { AppRoutingModule } from './app-routing.module';
import { ItemListComponent } from './ItemList/itemlist.component';
@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  //?????????????????
  providers: [CartService, ItemService, Cart],
  bootstrap: [AppComponent]
})
export class AppModule { }
