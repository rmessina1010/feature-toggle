import toggles from '../shared/toggles';

import * as ACTIONS  from './actions';

export default function rootReducer(state = { toggles:{}}, action) {
   switch (action.type){
        case ACTIONS.TOGGLE.type:
            return {...state,toggles:{...state.toggles, [action.fkey]:!state.toggles[action.fkey]} }

        case ACTIONS.SET_TOGGLES.type:
            return {...state,toggles}

        default:
            return state;
   }
}