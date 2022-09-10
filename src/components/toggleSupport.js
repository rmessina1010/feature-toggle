
import { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {store} from '../redux/configStore';

export function mapStateToProps(state) {
  const { toggles } = state;
  return { toggles }
}

const blankDepObj= {
    lib:{},
    payload:{}
}

const FToggle = ({fname, toggles, children, old=null})=>{
    const [,setRerend] =useState (false);

    useEffect(()=>{setRerend(d=>!d) },[toggles]);

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
        if (!cache[fname]){ cache[fname]=blankDepObj}
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



export const ftDepCache = async function (fname, filepaths=[], cache={}){
    const { toggles } = store.getState();
    if ( toggles[fname] && (!cache[fname] || Object.entries(cache[fname].payload).length === 0 )) {
        cache[fname]= await ftDepCacheShallow(fname, filepaths, cache[fname] || blankDepObj);
    }
    return cache;
}


export const ftDepCacheShallow = async function (fname, filepaths=[],cache){
    const fromArr = filepaths.map( path => importFtDeps(fname, path.from, path.mods));
    console.log(1)
    return Promise.all(fromArr)
            .then(
                impArr => impArr.reduce(
                    (agg,imp,i) => {
                    agg.lib[filepaths[i].from]=true ;
                    agg.payload =  { ...agg.payload, ...imp };
                    return agg;
                    }
                , cache))
            .catch((err) => { return blankDepObj;});
}

export const useCache = (fname, filepaths)=>{
    const { toggles } = store.getState();
    const [ocache, setOcache] = useState(blankDepObj);
    const [ freshRender, setFreshRender] = useState(true);
    const run =  useCallback(() => {
        if (toggles[fname] && Object.entries(ocache.payload).length === 0){
            ftDepCacheShallow(fname, filepaths, ocache)
            .then( newDeps => { setOcache(newDeps) ; setFreshRender(!freshRender)})
            .catch( (err) => console.log(err));
        }
    },[filepaths, fname, ocache, toggles, freshRender]);
    useEffect(()=> run(), [toggles, run]);
    return [ocache];
}

export function isFeatureOn(fname){
    const { toggles } = store.getState();
    return  (toggles[fname] === true) ;
}

export function useReRend(){
   const [renderFlag, setRenderFlag ] = useState(false);
   const run = useCallback (()=> setRenderFlag(f=>!f),[]);
   return [renderFlag, run ];
}
export default connect(mapStateToProps)(FToggle);
