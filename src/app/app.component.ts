import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductsState } from './store/reducers/products.reducer';
import { NgForm } from '@angular/forms';
import { deleteProduct, loadProducts, resetActiveProduct, saveProduct, setActiveProduct } from './store/actions/products.actions';
import { Product } from './model/product';
import { AppState } from './app.module';
import {
  getTotal,
  selectActiveProduct,
  selectAllProducts,
  selectAllProductsByMinPrice,
  selectProductError
} from './store/selectors/products.selector';

@Component({
  selector: 'fb-root',
  template: `
    
    <div 
      *ngIf="productsError$ | async"
      style="background-color: red; padding: 10px"
    > SERVER ERROR</div>
    
    <form #f="ngForm" (ngSubmit)="saveProduct(f)">
      <input type="text" name="name" [ngModel]="(productsActive$ | async)?.name" required>
      <input type="number" name="price" [ngModel]="(productsActive$ | async)?.price" required>
      <button type="submit" [disabled]="f.invalid">SAVE</button>
      <button type="button" (click)="reset(f)">RESET</button>
    </form>


    <button (click)="getProductsByPrice(0)">all product</button>
    <button (click)="getProductsByPrice(10)"> > 10 euro </button>

    <hr>
    <li
      *ngFor="let product of (products$ | async)"
      (click)="setActiveProduct(product)"
      [style.color]="product.id === (productsActive$ | async)?.id ? 'orange' : null "
    >
      {{product.name}} - € {{ product.price}}

      <button (click)="deleteProduct(product.id, $event)">delete</button>
    </li>
    <hr>
    Totale: {{productsTotal$ | async}}
  `,
})
export class AppComponent {
  products$: Observable<Product[]> = this.store.pipe(select(selectAllProductsByMinPrice(0)));
  productsActive$: Observable<Product> = this.store.pipe(select(selectActiveProduct));
  productsTotal$: Observable<number> = this.store.pipe(select(getTotal));
  productsError$: Observable<boolean> = this.store.pipe(select(selectProductError));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadProducts());
  }

  saveProduct(form: NgForm) {
    this.store.dispatch(saveProduct({product: form.value}));
  }

  deleteProduct(id: string | undefined, event: MouseEvent) {
    event.stopPropagation();
    if (id) {
      this.store.dispatch(deleteProduct({ id }));
    }
  }

  setActiveProduct(product: Product) {
    this.store.dispatch(setActiveProduct({ product }));
  }

  reset(f: NgForm) {
    this.store.dispatch(resetActiveProduct());
    f.reset();
  }

  getProductsByPrice(value: number) {
    this.products$ = this.store.pipe(select(selectAllProductsByMinPrice(value)))
  }
}
