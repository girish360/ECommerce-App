import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  template: `
    <h1>Ecommerce App</h1>
    <nav>
      <a routerLink="/ItemList" routerLinkActive="active">ItemList</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor() { }
 
  ngOnInit() {
    
  }
}
