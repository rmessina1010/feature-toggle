import FToggle, {Feature1, Feature2, Feature3, ftDepCache, isFeatureOn, mapStateToProps} from './features';
import {  useEffect, useState } from 'react';
import { connect } from 'react-redux';


const f2_imports =[
    { from: 'shared/dep2', mods:[]},
    { from: 'shared/dep3', mods:[]},
];
let deps= await ftDepCache('f2', f2_imports,{});


const Main = ({ toggles })=> {
 const [,setRenderDeps] =useState (false);

useEffect(  ()=>{
    ftDepCache('f2', f2_imports, deps).then(
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