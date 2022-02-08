import { AppState } from '../../app.module';
import { createSelector } from '@ngrx/store';
import { Product } from '../../model/product';

export const selectActiveProduct = (state: AppState) => state.products.active;
export const selectAllProducts = (state: AppState) => state.products.list;

export const selectAllProductsByMinPrice = (minPrice: number) => createSelector(
  selectAllProducts,
  list => list.filter(p => p.price >= minPrice)
);

export const getTotal = (state: AppState) => state.products.list
  .reduce((acc: number, curr: Product) => {
    return acc + +curr.price;
  }, 0);


export const selectProductError = (state: AppState) => state.products.error;
