import FToggle, { ftDepCache, isFeatureOn, mapStateToProps, useCache} from './toggleSupport';
import {Feature1, Feature2, Feature3,} from './features'
import { connect } from 'react-redux';
import { useEffect } from 'react';

const f2_imports =[
    { from: 'shared/dep2', mods:[]},
    { from: 'shared/dep3', mods:[]},
];

/* EXTERNAL USEAGE */
//let deps= await ftDepCache('f2', f2_imports,{});

const Main = ()=> {

    const [f2Cache,] = useCache('f2',f2_imports);
    const [f3Cache,] = useCache('f3',f2_imports);

    return (<div>
        <h1>Hello World.</h1>
        <button onClick={()=>console.log(f2Cache,isFeatureOn("f2") )}>CLICK</button>
        <p>This is a test</p>
        <p>f2 is {isFeatureOn("f2") ? 'on' : 'off'}* <br/> Note if component has been not connected to the redux store, or set up in a statefulway, this display may not be accurate. </p>
         <FToggle fname="f1"
            old={
            <p><b>Am the outbound component;</b> alterate to feature 1</p>
            }
            children={ <Feature1/>}
        />

         <FToggle fname="f2">
            <Feature2/>
            <p>{"local adition" + f2Cache.payload?.namedExp2} </p>
        </FToggle>
        <FToggle fname="f3">
            <Feature3/>
        </FToggle>
    </div>)
}

// export default connect(mapStateToProps)(Main);
export default Main;