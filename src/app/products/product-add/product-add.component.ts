import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {ProductService} from '../shared/product.service';
import {FileService} from '../../files/shared/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {FileMetadata} from '../../files/shared/file-metadata';
import {ImageMetadata} from '../../files/shared/image-metadata';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
  fileToUpload: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private ps: ProductService,
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
          this.router.navigate(['../'],
            {relativeTo: this.activatedRoute});
          // window.alert('product with id: ' + product.id + ' and name : ' + product.name + 'is added');
        });
    }
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
    // Going away soon.. Bye bye..
    // this.fileToUpload = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;
    // converting for upload
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File(
      [event.file],
      fileBeforeCrop.name
    , {type: fileBeforeCrop.type});
  }

}
