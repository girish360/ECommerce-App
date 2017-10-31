import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

import { Item } from './Item/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _httpService: Http) { }
  items: Item[] = [];
  ngOnInit() {
    this._httpService.get('/api/Tables').subscribe(values => {
      this.items = values.json() as Item[];
    });
  }
}
