import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { createStore } from 'redux';

import rootReducer  from './reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const persistantStore = createStore(persistedReducer)
export const persistor = persistStore(persistantStore)
