import { Component, OnInit } from '@angular/core';
import { ProductLogic } from '../models/product-logic';
import { Product } from '../models/product';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Categories, Manufacturers} from '../models/app.constants';
import { TableAction } from '../models/table-actions';
import { CustomValidator } from '../custom-validators/product-validator';


@Component({
  selector: 'app-reactive-form-product',
  templateUrl: './reactive-form-product.component.html',
  styleUrls: ['./reactive-form-product.component.css']
})
export class ReactiveFormProductComponent implements OnInit {

  constructor() { 
    this.productLogic = new ProductLogic();
    this.product = new Product("", "", "", "", "", 0);
    this.headers = new Array<string>();
    this.products = new Array<Product>();

    this.productForm = new FormGroup({
      ProductId : new FormControl(this.product.ProductId, Validators.compose([
        Validators.required,
        CustomValidator.Duplicate(this.productLogic)
      ])),
      ProductName : new FormControl(this.product.ProductName, Validators.compose([
        Validators.required
      ])),
      Category : new FormControl(this.product.Category, Validators.compose([
        Validators.required
      ])),
      Manufacturer : new FormControl(this.product.Manufacturer, Validators.compose([
        Validators.required
      ])),
      Description : new FormControl(this.product.Description, Validators.compose([
        Validators.required
      ])),
      Price : new FormControl(this.product.Price, Validators.compose([
        Validators.required,
        Validators.min(0)
      ]))
    });
  }

  get tableAction() { return TableAction; }

  private productLogic: ProductLogic;
  product: Product;
  headers: Array<string>;
  productForm: FormGroup;
  products: Array<Product>;

  categories = Categories;
  manufacturers = Manufacturers;

  ngOnInit() {
    for(let p in this.product){
      this.headers.push(p);
    }

    this.products = this.productLogic.getAllProducts();
  }

  clear(): void {
    this.product = new Product('', '', '', '', '', 0);
   }

  save(): void{
    this.product = this.productForm.value;
    console.log(this.productLogic.create(this.product));
    this.products = this.productLogic.getAllProducts();
    this.clear();
  }

  getSelectedRecord(prd: Product): void {
    this.productForm.setValue(prd);
  }

  delete(product: Product): void{
    console.log(this.productLogic.delete(product.ProductId));
  }

  modifyTable(action: TableAction){
    switch (action) {
      case TableAction.sort:
        this.products = this.products.sort((p1, p2) => this.compareFunction(p1, p2))
        break;
      
      case TableAction.reverse:
        this.products = this.products.reverse();
        break;

      default:
        break;
    }
  }

  compareFunction(product1: Product, product2: Product){
    var result = product1.ProductName.localeCompare(product2.ProductName);
    if(result == 0)
    {
      return product1.Price - product2.Price;
    }
    else
    {
      return result;
    }
  }
}
