import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class AppNavService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private readonly http: HttpClient) {}
  private readonly pageHeader$ = new Subject<string>();
  initialInventory: Inventory = {
    name: '',
    quantity: 0,
    price: '',
    image: '',
    description: '',
    available: false,
  };
  private readonly newInventory$ = new BehaviorSubject<Inventory>(
    this.initialInventory
  );

  get pageHeaderCast$() {
    return this.pageHeader$;
  }

  set setHeader(header: string) {
    this.pageHeader$.next(header);
  }

  set setInventory(inventory: Inventory) {
    this.newInventory$.next(inventory);
  }

  get getNewInventory$() {
    return this.newInventory$.asObservable();
  }

  get getInventory$(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>('assets/data.json', this.httpOptions);
  }
}
