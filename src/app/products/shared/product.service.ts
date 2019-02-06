import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.db
      .collection<Product>('products')
      // This will return an Observable
      .snapshotChanges()
      .pipe(
        map(actions => {
          // actions is an array of DocumentChangeAction
          /*
          const prods: Product[] = [];
          actions.forEach(action => {
            const data = action.payload.doc.data() as Product;
            prods.push({
              id: action.payload.doc.id,
              name: data.name
            });
          });
          return prods;
          */

          return actions.map(action => {
            const data = action.payload.doc.data() as Product;
            return {
              id: action.payload.doc.id,
              name: data.name
            };
          });
        })
      );
  }

  getProduct(id: string) {
    this.db.doc<Product>('products/' + id).get()
      .subscribe(productFound => {

        const protData = productFound.data() as Product;
      });
  }

  update(product: Product) {
    this.db.doc<Product>('products/' + product.id)
      .update(product)
      .then(prod => {
        debugger;
      });
  }

  delete(product: Product) {
    this.db.doc<Product>('products/' + product.id)
      .delete()
      .then(prod => {
        debugger;
      });
  }

  add(product: Product) {
    this.db.collection<Product>('products')
      .add(product)
      .then(prod => {
        debugger;
      });
  }
}
