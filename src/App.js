import './App.css';
import Main from './components/main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configStore';

import { PersistGate } from 'redux-persist/es/integration/react';

import * as ACTIONS  from './redux/actions';
import toggles from './shared/toggles';



const { persistor, store } = ConfigureStore();

function App() {

  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
      >
        <div className="App">
          <Main  />
          { Object.keys(toggles).map(key => <button key={key} onClick={ ()=>store.dispatch({...ACTIONS.TOGGLE, fkey:key})} >Toggle {key.toUpperCase()}</button>)}
        </div>
       </PersistGate>
    </Provider>
   );
}

export default App;
