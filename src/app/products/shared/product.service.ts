import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, throwError} from 'rxjs';
import {Product} from './product.model';
import {first, map, switchMap, tap} from 'rxjs/operators';

const collection_path = 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.db
      .collection<Product>(collection_path)
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

  deleteProduct(id: string): Observable<Product> {
    return this.db.doc<Product>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
          debugger;
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            throw new Error('Product not found');
            debugger;
          } else {
            return from(
              this.db.doc<Product>(collection_path + '/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = productDocument.data() as Product;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
    /*return Observable.create(obs => {
      this.db.doc<Product>('products/' + id)
        .delete()
        .then(() => obs.next())
        .catch(err => obs.error(err))
        .finally(() => obs.complete());
    });*/
    /*return this.db.doc<Product>('products/' + id)
      .delete();*/
  }
}
