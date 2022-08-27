import FToggle, {Feature1, Feature2, Feature3, ToggleImports, mapStateToProps} from './features';
import { useEffect } from 'react';
import { connect } from 'react-redux';


let xx = [{path:"shared/dep1", keys:[{key:'namedExp1'}]}, {path:"shared/dep1"}, {path:"shared/dep3"}];

const Main = ({toggles})=> {
    useEffect( ()=>{
        ToggleImports('f2',toggles, xx ).then(
            imps => {
                console.log('toggling import', imps);
            }
        );
     },[toggles]);


     return (<div>
        <h1>Hello World.</h1>
        <p>This is a test</p>
        <FToggle fname="f1"
            old={
            <p>Am the outbound component</p>
            }
            children={ <Feature1/>}
        />

         <FToggle fname="f2">
            <Feature2/>
            <p>local adition</p>
        </FToggle>
        <FToggle fname="f3">
            <Feature3/>
        </FToggle>
    </div>)
}
export default connect(mapStateToProps)(Main);