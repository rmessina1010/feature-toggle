import FToggle, {Feature1, Feature2, Feature3, FToggleImportCached, mapStateToProps} from './features';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import getStoredState from 'redux-persist/es/getStoredState';


// let xx = [{path:"shared/dep1", keys:[{key:'namedExp2'}]}, {path:"shared/dep2"}, {path:"shared/dep3"}];


const Main = ({toggles})=> {
const  [deps,setDeps] =useState({});

useEffect( ()=>{
    FToggleImportCached('f2','shared/dep2', toggles,[], deps )
        .then(
            imps => {
                if ( imps ) {setDeps({...deps, f2:imps});}
                console.log('toggling import',deps);
        }
    )
},[toggles,deps]);


     return (<div>
        <h1>Hello World.</h1>
        <p>This is a test</p>
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