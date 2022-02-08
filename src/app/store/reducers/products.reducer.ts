import { createReducer, on } from '@ngrx/store';
import { Product } from '../../model/product';
import {
  addProductFailed,
  addProductSuccess,
  deleteProduct, deleteProductFailed, deleteProductSuccess, editProductFailed, editProductSuccess, loadProductsFailed,
  loadProductsSuccess,
  resetActiveProduct,
  saveProduct,
  setActiveProduct
} from '../actions/products.actions';

export interface ProductsState {
  list: Product[];
  active: Product;
  error: boolean;
}

const initialState: ProductsState = {
  list: [],
  active: { name: '', price: 0 } as Product,
  error: false
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsFailed, state => ({ ...state, error: true})),
  on(addProductFailed, state => ({ ...state, error: true})),
  on(editProductFailed, state => ({ ...state, error: true})),
  on(deleteProductFailed, state => ({ ...state, error: true})),

  on(loadProductsSuccess, (state, action) => ({ ...state, list: action.products, error: false})),

  on(deleteProductSuccess, (state, action) => {
    return {
      error: false,
      active: { name: '', price: 0 } as Product,
      list: state.list.filter(p => p.id !== action.id),
    };
  }),


  on(setActiveProduct, (state, action) => ({
      ...state,
      active: { ...action.product}
    })
  ),

  on(addProductSuccess, (state, action) => {
    return {
      error: false,
      active: { name: '', price: 0 } as Product,
      list: [...state.list, { ...action.product }]
    };
  }),

  on(editProductSuccess, (state, action) => {
    return {
      error: false,
      active: { ...state.active, ...action.product },
      list: state.list.map(p => {
        if (p.id === state.active.id) {
          return {...p, ...action.product };
        }
        return p;
      })
    };
  }),

  on(resetActiveProduct, (state) => {
    return {
      ...state,
      active: { name: '', price: 0 } as Product,
    };
  })
);
