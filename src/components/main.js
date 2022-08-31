import FToggle, {Feature1, Feature2, Feature3, FToggleImportCached, FToggleImport, isFeatureOn, mapStateToProps} from './features';
//import {  useState } from 'react';
import { connect } from 'react-redux';

let deps ={};
if (!deps.f2 && isFeatureOn("f2") ){
  // deps["f2"] = await import('../shared/dep2');
  deps["f2"] =  await FToggleImport('f2', 'shared/dep2');
  console.log(deps);
}

// import getStoredState from 'redux-persist/es/getStoredState';

// let xx = [{path:"shared/dep1", keys:[{key:'namedExp2'}]}, {path:"shared/dep2"}, {path:"shared/dep3"}];

const Main = ({ toggles})=> {
/*
const  [deps,setDeps] =useState({});

useEffect( ()=>{
    FToggleImportCached('f2','shared/dep2', [], deps )
        .then(
            imps => {
                if ( imps ) {setDeps({...deps, f2:imps});}
                console.log('toggling import',deps);
        }
    )
},[deps, toggles]);

 */
    return (<div>
        <h1>Hello World.</h1>
        <p>This is a test</p>
        <p>f2 is {isFeatureOn("f2") ? 'on' : 'off'}</p>
         <FToggle fname="f1"
            old={
            <p>Am the outbound component </p>
            }
            children={ <Feature1/>}
        />

         <FToggle fname="f2">
            <Feature2/>
            <p>{"local adition" + deps?.f2?.namedExp2} </p>
        </FToggle>
        <FToggle fname="f3">
            <Feature3/>
        </FToggle>
    </div>)
}
export default connect(mapStateToProps)(Main);