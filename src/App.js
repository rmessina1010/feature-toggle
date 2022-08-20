import './App.css';
import Main from './components/main';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer  from './redux/reducers';
import * as ACTIONS  from './redux/actions';
import toggles from './shared/toggles'

const store= createStore(rootReducer);


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
