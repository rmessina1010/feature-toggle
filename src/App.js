import './App.css';
import Main from './components/main';
import FTtest from './components/testFtoggle';
import Dash from './components/dash'
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/es/integration/react';

import { persistor, store } from './redux/configStore';


function App() {

  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
      >
        <div className="App">
          <FTtest />
          <Main  />
          <Dash />
        </div>
       </PersistGate>
    </Provider>
   );
}

export default App;
