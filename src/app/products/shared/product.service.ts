import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) {
    //this.add10Products();
  }

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

  deleteProduct(id: string): Promise<void> {
    return this.db.doc<Product>('products/' + id)
      .delete();
  }

  add10Products() {
    for (let i = 1; i < 10; i++) {
      this.db.collection<Product>('products')
        .add({name: 'p' + i});
    }
  }
}
