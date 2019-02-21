import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {ProductService} from '../shared/product.service';
import {FileService} from '../../files/shared/file.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
  fileToUpload: File;
  constructor(private ps: ProductService,
              private fs: FileService) {
    this.productFormGroup = new FormGroup({
     name: new FormControl('')
    });
  }

  ngOnInit() {
  }

  addProduct() {
    const productData = this.productFormGroup.value;
    if (this.fileToUpload) {
      this.fs.upload(this.fileToUpload)
        .pipe(
          switchMap(metadata => {
            productData.pictureId = metadata.id;
            return this.ps.addProduct(productData);
          })
        )
        .subscribe(product => {
          window.alert('product with id: ' + product.id + ' and name : ' + product.name + 'is added');
        });
    }
  }

  uploadFile(event) {
    this.fileToUpload = event.target.files[0];
  }

}
