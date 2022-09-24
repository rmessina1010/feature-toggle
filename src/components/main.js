import FToggle, { useToggleSelector, FToggleSelector,useToggleSelectorDepsCache, ftDepCache, isFeatureOn, mapStateToProps, useCache, getTogglesState, useReRend, hasToggleChanged, useTogglesAndStore, useToggles, useCacheAndStore, useRefreshOnToggle} from './toggleSupport';
import {Feature1, Feature2, Feature3,} from './features'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';


const f2_imports =[
    { from: 'shared/dep2', mods:[]},
    { from: 'shared/dep3', mods:[]},
];
const f3_imports =[
    { from: 'shared/dep3', mods:[]}
];

/* NO EXTERNAL USEAGE */

const Main = ()=> {

    const toggles = useToggleSelector();
    const [f2Cache,f2Tog] = useToggleSelectorDepsCache('f2',f2_imports);
    const [f3Cache,f3Tog] = useToggleSelectorDepsCache('f3',f3_imports);


    return (<div>
        <h1>Hello World.</h1>
        <p>{JSON.stringify(getTogglesState())}</p>
        <p>{JSON.stringify(toggles)}</p>
        <p>{JSON.stringify(f2Tog)}</p>
        <button onClick={()=>console.log( f2Cache, f3Cache,isFeatureOn("f2"), getTogglesState().f2 )}>CLICK[for data in console]</button>
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
            <p>{"local adition" + f2Cache?.payload?.namedExp2} </p>
        </FToggleSelector>
        <FToggleSelector fname="f3">
            <Feature3/>
        </FToggleSelector>
    </div>)
}

//export default connect(mapStateToProps)(Main);
export default Main;