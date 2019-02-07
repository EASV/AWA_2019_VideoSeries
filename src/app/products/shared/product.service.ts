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

  deleteProduct(id: string) {
    this.db.doc<Product>('products/sdljkfndsljknfkljfds')
      .delete()
      .then(product => {
        debugger;
      })
      .catch(err => {
        debugger;
      })
      .finally(() => {
        debugger;
      });
  }
}
