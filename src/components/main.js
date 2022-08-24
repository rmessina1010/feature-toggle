import FToggle, {Feature1, Feature2, Feature3, ToggleImports} from './features'

//const All = await FToggleImports("f1", "./dept.js");
//console.log(All);

const Main = ({toggle})=> {

   ToggleImports("f1", toggle, ["../shared/dep1"]).then(
    all => console.log(all )
   );
     return (<div>
        <h1>Hello World.</h1>
        <p>This is a test</p>
        <FToggle fname="f1">
            <Feature1/>
        </FToggle>
        <FToggle fname="f2">
            <Feature2/>
            <p>local adition</p>
        </FToggle>
        <FToggle fname="f3">
            <Feature3/>
        </FToggle>
    </div>)
}
export default Main;