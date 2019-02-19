import { Injectable } from '@angular/core';
import {FileMetadata} from './file-metadata';
import {from, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  upload(file: File): Observable<FileMetadata> {
    this.storage.ref('product-pictures/' + file.name)
      .put(file)
      .then(() => {
        debugger;
      });
    return Observable.create();
  }

  addFileMetadata(meta: FileMetadata): Observable<FileMetadata> {
    return from(
      this.db.collection('files')
      .add(meta)
    ).pipe(
      map(documentRef => {
        meta.id = documentRef.id;
        return meta;
      })
    );
  }
}
