import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../../files/shared/file.service';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Observable<Product[]>;
  productFormGroup: FormGroup;
  constructor(private ps: ProductService,
                private fs: FileService) {
    this.productFormGroup = new FormGroup({
      name: new FormControl(''),
      dinko: new FormControl('')
     });
  }

  ngOnInit() {
    this.products = this.ps.getProducts();
  }

  deleteProduct(product: Product) {
    const obs = this.ps.deleteProduct(product.id);
    obs.subscribe(productFromFirebase => {
      debugger;
        window.alert('product with id: ' + productFromFirebase.id + ' is Deleted');
      }, error1 => {
      debugger;
      window.alert('product not found id: ' + product.id);
    });
  }

  addProduct() {
    const productData = this.productFormGroup.value;
    this.ps.addProduct(productData)
      .subscribe(product => {
        window.alert('product with id: ' + product.id + ' and name : ' + product.name + 'is added');
      });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.fs.upload(file)
      .subscribe();
    debugger;
  }

}
