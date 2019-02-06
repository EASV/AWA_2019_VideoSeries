import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Observable<Product[]>;
  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.products = this.ps.getProducts();
  }

  updateProduct(product: Product) {
    product.name = product.name + '1';
    this.ps.update(product);
  }

  deleteProduct(product: Product) {
    this.ps.delete(product);
  }

  addProduct() {
    this.ps.add({name: 'New Product'});
  }

  getDetails(product: Product) {
    this.ps.getProduct(product.id);
  }

}
