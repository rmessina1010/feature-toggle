import FToggle, {useToggleSelectorDeps, dynamicImportsReducer,useToggleSelector, FToggleSelector,useToggleSelectorDepsCache, ftDepCache, isFeatureOn, mapStateToProps, useCache, getTogglesState, useReRend, hasToggleChanged, useTogglesAndStore, useToggles, useCacheAndStore, useRefreshOnToggle} from './toggleSupport';
import {Feature1, Feature2, Feature3,} from './features'
import { connect } from 'react-redux';
import { useEffect, useState , useRef } from 'react';


const f2_imports =[
    { from: 'shared/dep2', mods:[]},
    { from: 'shared/dep3', mods:[]},
];
const f3_imports =[
    { from: 'shared/dep3', mods:[]}
];

const allFtImports =  {f2:f2_imports , f3: f3_imports } ;

/* EXTERNAL USEAGE */
//  initiate a variable to hold the import
let deps = await dynamicImportsReducer(allFtImports);
const impClosure = () => {return {imports:allFtImports, cache:deps, setter: newDeps=>deps=newDeps }} // define a fucntion that updates the import cache  ( this is always teh same  and  will be passed to the  custom hook)

const Main = ()=> {
    let ct = useRef(0);
   const toggles = useToggleSelector();
   useToggleSelectorDeps('f2',impClosure);
   useToggleSelectorDeps('f3',impClosure);
    ct.current++

    return (<div>
        <h1>Hello World.{ct.current}</h1>
        <p>{JSON.stringify(getTogglesState())}</p>
        <p>{JSON.stringify(toggles)}</p>
        <p>{JSON.stringify(deps)}</p>
        <button onClick={()=>console.log( deps.f2, deps.f3,isFeatureOn("f2"), getTogglesState().f2 )}>CLICK[for data in console]</button>
        <p>This is a test</p>
        <p>f2 is {isFeatureOn("f2") ? 'on' : 'off'}* <br/> Needs to connect component to store  or use useStoreToggles custom hook </p>
         <FToggleSelector fname="f1"
            old={
            <p><b>Am the outbound component;</b> alternate to feature 1</p>
            }
            children={ <Feature1/>}
        />

         <FToggleSelector fname="f2">
            <Feature2/>
            <p>{"local adition" + deps.f2?.payload?.namedExp2} </p>
        </FToggleSelector>
        <FToggleSelector fname="f3">
            <Feature3/>
        </FToggleSelector>
    </div>)
}

//export default connect(mapStateToProps)(Main);
export default Main;