import { productReducer } from './products.reducer';
import { authReducer } from './auth.reducer';
import { itemReducer } from './item.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../app.module';

export const reducers: ActionReducerMap<AppState> = {
  products: productReducer,
  auth: authReducer,
  items: itemReducer
}
