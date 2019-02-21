import { Injectable } from '@angular/core';
import {FileMetadata} from './file-metadata';
import {defer, from, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  upload(file: File): Observable<FileMetadata> {
    return this.addFileMetadata(
      {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }
    ).pipe(
      switchMap(fileMeta => {
        return defer(() =>
          this.storage.ref('product-pictures/' + fileMeta.id)
          .put(file)
          .then()
        ).pipe(
          map(fileRef => {
            return fileMeta;
          })
        );
      })
    );
  }

  addFileMetadata(meta: FileMetadata): Observable<FileMetadata> {
    return defer(() =>
      this.db.collection('files')
      .add(meta)
    ).pipe(
      map(documentRef => {
        meta.id = documentRef.id;
        return meta;
      })
    );
  }

  getFileUrl(id: string): Observable<any> {
    return this.storage.ref('product-pictures/' + id)
      .getDownloadURL();
  }
}
