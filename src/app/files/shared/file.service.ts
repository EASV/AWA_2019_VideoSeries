import { Injectable } from '@angular/core';
import {FileMetadata} from './file-metadata';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  upload(file: File): Observable<FileMetadata> {
    return Observable.create();
  }
}
