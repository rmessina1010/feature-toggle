import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { createStore, applyMiddleware } from 'redux';

// import { createStateSyncMiddleware, initMessageListener, initStateWithPrevTab} from "redux-state-sync";
import { sessionService } from 'redux-react-session';

import toggles from '../shared/toggles';

import rootReducer  from './reducers';

const persistConfig = {
  key: 'root',
  storage : sessionStorage
}

const ConfigureStore = () => {
      const persistedReducer = persistReducer(persistConfig, rootReducer)
      const store = createStore(
        persistedReducer,
        {toggles},
       // applyMiddleware(createStateSyncMiddleware({blacklist: ["persist/PERSIST", "persist/REHYDRATE"],}))
      )
      const persistor = persistStore(store)
      return { persistor, store };
}

export const { persistor, store } = ConfigureStore();

// initStateWithPrevTab(store);
sessionService.initSessionService(persistor);

