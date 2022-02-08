import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addProduct, addProductFailed, addProductSuccess,
  deleteProduct, deleteProductFailed, deleteProductSuccess, editProduct, editProductFailed, editProductSuccess,
  loadProducts,
  loadProductsFailed,
  loadProductsSuccess, saveProduct
} from '../actions/products.actions';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Product } from '../../model/product';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { selectActiveProduct } from '../selectors/products.selector';

@Injectable()
export class ProductsEffects {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    switchMap(() => this.http.get<Product[]>('http://localhost:3000/products')
      .pipe(
        map(result => loadProductsSuccess({ products: result})),
        catchError(() => of(loadProductsFailed()))
      )
    )
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    switchMap((action) => this.http.delete(`http://localhost:3000/products/${action.id}`)
      .pipe(
        map(() => deleteProductSuccess({ id: action.id})),
        catchError( () => of(deleteProductFailed()))
      )
    )
  ));

  saveProduct$ = createEffect(() => this.actions$.pipe(
    ofType(saveProduct),
    withLatestFrom(
      this.store.pipe(select(selectActiveProduct))
    ),
    mergeMap(([action, activeProduct]) => {
      if (activeProduct.id) {
        return of(editProduct({ product: {...action.product, id: activeProduct.id}}));
      } else {
        return of(addProduct({ product: action.product}));
      }
    })
  ));

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    mergeMap(action => this.http.post<Product>('http://localhost:3000/products', action.product)
      .pipe(
        map(result => addProductSuccess({ product: result })),
        catchError( () => of(addProductFailed()))
      )
    )
  ));

  editProduct$ = createEffect(() => this.actions$.pipe(
    ofType(editProduct),
    mergeMap(action => this.http.patch<Product>(`http://localhost:3000/products/${action.product.id}`, action.product)
      .pipe(
        map(result => editProductSuccess({ product: result})),
        catchError( () => of(editProductFailed()))
      )
    )
  ));

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
