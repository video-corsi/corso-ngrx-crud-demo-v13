import { createAction, props } from '@ngrx/store';
import { Product } from '../../model/product';

export const loadProducts = createAction(
  '[Products] load'
);

export const loadProductsSuccess = createAction(
  '[Products] load success',
  props<{ products: Product[]}>()
);

export const loadProductsFailed = createAction(
  '[Products] load failed',
);


export const saveProduct = createAction(
  '[Products] save',
  props<{ product: Product}>()
);


export const addProduct = createAction(
  '[Products] add',
  props<{ product: Product}>()
);

export const addProductSuccess = createAction(
  '[Products] add success',
  props<{ product: Product}>()
);

export const addProductFailed = createAction(
  '[Products] add failed',
);


export const editProduct = createAction(
  '[Products] edit',
  props<{ product: Product}>()
);

export const editProductSuccess = createAction(
  '[Products] edit success',
  props<{ product: Product}>()
);

export const editProductFailed = createAction(
  '[Products] edit failed',
);




export const deleteProduct = createAction(
  '[Products] delete',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Products] delete success',
  props<{ id: string }>()
);

export const deleteProductFailed = createAction(
  '[Products] delete failed',
);



export const setActiveProduct = createAction(
  '[Products] set active',
  props<{ product: Product}>()
);

export const resetActiveProduct = createAction(
  '[Products] reset active'
);
