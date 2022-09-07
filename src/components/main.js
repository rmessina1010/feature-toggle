import FToggle, {Feature1, Feature2, Feature3, importFtDepsIfNotCached, isFeatureOn, mapStateToProps} from './features';
import {  useEffect, useState } from 'react';
import { connect } from 'react-redux';

/*
const calling = async function (deps={}){
        deps =    await importFtDepsIfNotCached('f2', 'shared/dep2', [], deps);
        deps =    importFtDepsIfNotCached('f2', 'shared/dep3', [], deps);
        return deps;
}
*/
const calling = async function (fname, filepaths=[], deps={}){

        deps =    await importFtDepsIfNotCached('f2', 'shared/dep2', [], deps);
        deps =    await importFtDepsIfNotCached('f2', 'shared/dep3', [], deps);
        return deps;
}

let deps= await calling();


//if (isFeatureOn("f2") ){
  /* deps["f2"] = await import('../shared/dep2');*/
//  deps =  await importFtDepsIfNotCached('f2', 'shared/dep2', [], deps);
//  deps =  await importFtDepsIfNotCached('f2', 'shared/dep3', [], deps);
//  console.log(deps);
//}

// import getStoredState from 'redux-persist/es/getStoredState';

// let xx = [{path:"shared/dep1", keys:[{key:'namedExp2'}]}, {path:"shared/dep2"}, {path:"shared/dep3"}];

const Main = ({ toggles})=> {
/*
const  [deps,setDeps] =useState({});

useEffect( ()=>{
    importFtDepsIfNotCached('f2','shared/dep2', [], deps )
        .then(
            imps => {
                if ( imps ) {setDeps({...deps, f2:imps});}
                console.log('toggling import',deps);
        }
    )
},[deps, toggles]);

 */

const [,setRenderDeps] =useState (false);

useEffect(  ()=>{
    calling(deps).then(
        newDeps =>{
            deps = newDeps;
            setRenderDeps(d=>!d)
        }
    );
},[toggles]);

    return (<div>
        <h1>Hello World.</h1>
        <button onClick={()=>console.log(deps)}>CLICK</button>
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
            <p>{"local adition" + deps?.f2?.payload?.namedExp2} </p>
        </FToggle>
        <FToggle fname="f3">
            <Feature3/>
        </FToggle>
    </div>)
}
export default connect(mapStateToProps)(Main);