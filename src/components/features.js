import { connect } from 'react-redux';
import {store} from '../redux/configStore';

export function mapStateToProps(state) {
  const { toggles } = state;
  return { toggles }
}

export const Feature1= (props)=>{

    return(
        <div>
            <h2>feature 1</h2>
            <p>example and stuff</p>
        </div>
    )
}

export const Feature2= (props)=>{

    return(
        <div>
            <h2>FEATURE 2</h2>
            <p>example and stuff</p>
        </div>
    )
}
export const Feature3= (props)=>{

    return(
        <div>
            <h2>FEATURE 3</h2>
            <p>Additional feature</p>
        </div>
    )
}

const FToggle = ({fname, toggles, children, old=null})=>{
    return  (!fname || toggles[fname]) ? <>{children}</> : old ;
}


export const ToggleImports =  await function (fname, imports=[]){
    const { toggles } = store.getState();

    // short circuit  with empy object if: no imports,  improper imports data, toggle not present or off
    if (!Array.isArray(imports) || imports.length === 0 || !toggles[fname] ) { return Promise.resolve({}); }

    //do import
    const imported =  Promise.all(imports.map(imp=> import(`../${imp.path}`)));

    // prep import results
    const results ={} ;
    imports.forEach(
        (imp, index) =>{
            let name = imp.name || index;
            if (!Array.isArray(imp.keys)) { results[name] =  {...imported[index]};}
            else{
                results[name] = imp.keys.reduce((theObj, akey) => {
                    if (akey.key){
                        let kname = akey.as || akey.key;
                        theObj[kname] = imported[index][akey.key];
                    }
                    theObj[akey] = imported[index][akey];
                    return theObj;  }
                ,{} )
            }
        });
    return results;
}

export const updateFtDepsCache =  async function (fname, fromFile, imports =[], cache={} ){
    const { toggles } = store.getState();
    if ( toggles[fname] && (!cache[fname] || !cache[fname].lib[fromFile])) {
        if (!cache[fname]){ cache[fname]={payload:{}, lib:{}}}
        let payload = await importFtDeps(fname, fromFile, imports);
        cache[fname].lib[fromFile]=true;
        cache[fname].payload =  { ...cache[fname].payload, ...payload };
    }
    return  cache ;
}

export const importFtDeps =  async function (fname, fromFile, imports =[] ){
    const { toggles } = store.getState();

    // short circuit
    if ( !toggles[fname] ) { return {}; }

    //do import
    const imported =  await import(`../${fromFile}`);
    if (!Array.isArray(imports) || !imports.length ) {   return  {...imported};   }

    // return  destructured  results
    return imports.reduce(
        (results, imp) => {
            if (typeof imp === 'string' || imp instanceof String){
                return {...results, [imp]: imported[imp]}
            } else if (typeof imp.name === 'string' || imp.name instanceof String) {
                let as = (typeof imp.as === 'string' || imp.as instanceof String) ? imp.as : imp.name;
                return {...results, [as]: imported[imp.name]}
            }
           return results;
        }, {});
 }

 export function isFeatureOn(fname){
    const { toggles } = store.getState();
    return  (toggles[fname] === true) ;
}


export default connect(mapStateToProps)(FToggle);

