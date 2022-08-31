import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { createStore } from 'redux';

import rootReducer  from './reducers';

const persistConfig = {
  key: 'root',
  storage
}

const ConfigureStore = () => {
      const persistedReducer = persistReducer(persistConfig, rootReducer)
      const store = createStore(persistedReducer, {toggles:{}})
      const persistor = persistStore(store)
      return { persistor, store };
}

export const { persistor, store } = ConfigureStore();
