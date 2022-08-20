import './App.css';
import Main from './components/main';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import * as ACTIONS  from './redux/actions';
import toggles from './shared/toggles'
import store from './redux/store'


function App() {
  useEffect(()=>{
    store.dispatch(ACTIONS.SET_TOGGLES);
  },[])

  return (
    <Provider store={store}>
      <div className="App">
        <Main />
        { Object.keys(toggles).map(key => <button onClick={ ()=>store.dispatch({...ACTIONS.TOGGLE, fkey:key})} >Toggle {key.toUpperCase()}</button>)}
       </div>
    </Provider>
   );
}

export default App;
