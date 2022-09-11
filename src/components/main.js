import FToggle, { ftDepCache, isFeatureOn, mapStateToProps, useCache, getTogglesState, useReRend, hasToggleChanged, useStoreToggles, useToggles} from './toggleSupport';
import {Feature1, Feature2, Feature3,} from './features'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';


const f2_imports =[
    { from: 'shared/dep2', mods:[]},
    { from: 'shared/dep3', mods:[]},
];

/* EXTERNAL USEAGE */
const depsFoo = async(cch={}) =>  ftDepCache('f2', f2_imports,cch);
let deps = await depsFoo();
const updateDeps = (newDeps)=>{ deps = newDeps}

const Main = ({ toggles })=> {
    //const [f2Cache,] = useCache('f2',f2_imports);
    //const [f3Cache,] = useCache('f3',f2_imports);

   useToggles(depsFoo,updateDeps, toggles);


    return (<div>
        <h1>Hello World.</h1>
        <button onClick={()=>console.log( deps.f2 ,isFeatureOn("f2") )}>CLICK[for data in console]</button>
        <p>This is a test</p>
        <p>f2 is {isFeatureOn("f2") ? 'on' : 'off'}* <br/> Needs to connect component to store  or use useStoreToggles custom hook </p>
         <FToggle fname="f1"
            old={
            <p><b>Am the outbound component;</b> alternate to feature 1</p>
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
//export default Main;