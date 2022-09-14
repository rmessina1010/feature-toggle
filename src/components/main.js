import FToggle, { ftDepCache, isFeatureOn, mapStateToProps, useCache, getTogglesState, useReRend, hasToggleChanged, useTogglesAndStore, useToggles, useCacheAndStore, FToggleWithStore, useRefreshOnToggle} from './toggleSupport';
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

/* EXTERNAL USEAGE */

const Main = ()=> {

    const toggles = useRefreshOnToggle();
    const [f2Cache] = useCacheAndStore('f2',f2_imports);
    const [f3Cache] = useCacheAndStore('f3',f3_imports);


    return (<div>
        <h1>Hello World.</h1>
        <p>{JSON.stringify(getTogglesState())}</p>
        <p>{JSON.stringify(toggles)}</p>
        <button onClick={()=>console.log( f2Cache, f3Cache,isFeatureOn("f2"), getTogglesState().f2 )}>CLICK[for data in console]</button>
        <p>This is a test</p>
        <p>f2 is {isFeatureOn("f2") ? 'on' : 'off'}* <br/> Needs to connect component to store  or use useStoreToggles custom hook </p>
         <FToggleWithStore fname="f1"
            old={
            <p><b>Am the outbound component;</b> alternate to feature 1</p>
            }
            children={ <Feature1/>}
        />

         <FToggleWithStore fname="f2">
            <Feature2/>
            <p>{"local adition" + f2Cache?.payload?.namedExp2} </p>
        </FToggleWithStore>
        <FToggleWithStore fname="f3">
            <Feature3/>
        </FToggleWithStore>
    </div>)
}

//export default connect(mapStateToProps)(Main);
export default Main;