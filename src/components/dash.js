import * as ACTIONS  from '../redux/actions';
import toggles from '../shared/toggles';
import {  store } from '../redux/configStore';

const Dash = ()=>{
    return (
         <> <hr/>
          <h5>This part mimics the feature toggle dashboard</h5>
          { Object.keys(toggles).map(key => <button key={key} onClick={ ()=>store.dispatch({...ACTIONS.TOGGLE, fkey:key})} >Toggle {key.toUpperCase()}</button>)}
        </>
    )
}

export default Dash;