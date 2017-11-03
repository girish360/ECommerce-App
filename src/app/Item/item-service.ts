import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Item } from './item'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'


@Injectable()
export class ItemService {
  private url = `api/Tables`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }


  getItems(): Promise<Item []> {
    return this.http.get(this.url)
      .toPromise()
      .then(x => x.json() as Item [])
      .catch(this.handleError);
  }

  getItem(id: number): Promise<Item > {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Item )
      .catch(this.handleError);
  }

  getItemByName(name: String): Promise<Item> {
    const url = `${this.url}/${name}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Item)
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
