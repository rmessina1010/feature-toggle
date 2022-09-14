import _, { set } from "lodash";

import { useState, useEffect, useCallback, useRef } from 'react';
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
    const ftog=toggles?.[fname] || store.getState().toggles?.[fname];

    useEffect(()=>{setRerend(d=>!d) },[ftog]);

    return  (!fname || ftog) ? <>{children}</> : old ;
}

export const  FToggleWithStore = ({fname, children, old=null})=>{
    const [featureFlag,setFeatureFlag] = useState (store.getState().toggles?.[fname]);
    const run =  ()=> setFeatureFlag(store.getState().toggles[fname]);
    useEffect(run,[featureFlag, fname]);
    store.subscribe(run);
    return  (!fname || featureFlag) ? <>{children}</> : old ;
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
        if (!cache[fname]){ cache[fname]={...blankDepObj}}
        let payload = await importFtDeps(fname, fromFile, imports);
        cache[fname].lib={...cache[fname].lib, [fromFile]:true};
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
        cache[fname]= await ftDepCacheShallow(fname, filepaths, cache[fname] || {...blankDepObj});
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
                    agg.lib = {...agg.lib, [filepaths[i].from]:true} ;
                    agg.payload =  { ...agg.payload, ...imp };
                    return agg;
                    }
                , cache))
            .catch((err) => { return {...blankDepObj};});
}

export const useCache = (fname, filepaths)=>{
    const { toggles } = store.getState();
    const [ocache, setOcache] = useState({...blankDepObj});
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

export function hasToggleChanged(old){
    const { toggles } = store.getState();
    return [!_.isEqual(toggles, old), toggles];
}

export function getTogglesState(){
    const { toggles } = store.getState();
    return toggles;
}

export function useReRend(){
   const [renderFlag, setRenderFlag ] = useState(false);
   const run = useCallback (()=> setRenderFlag(f=>!f),[]);
   return [renderFlag, run ];
}

export function useTogglesAndStore(depsFoo, upDateDeps ){

    const { toggles:storeTog } = store.getState();
    const [toggles, setToggles] = useState(storeTog);

    const handleToggleChange = useCallback(()=>{
        depsFoo()
        .then( newDeps =>{
            upDateDeps(newDeps);
            const { toggles:newTogs } = store.getState();
            setToggles(()=>newTogs);
        });
    }, [depsFoo, upDateDeps]);

    useEffect(()=>store.subscribe(handleToggleChange),[handleToggleChange])

    return [ toggles ];
};

export function useToggles(depsFoo, upDateDeps, toggles ){
    const [, set_RenderFlag ] = useState(false);
    const handleUpdate = useCallback(()=>{
        depsFoo()
        .then( newDeps =>{
            upDateDeps(newDeps);
            set_RenderFlag((rf)=>!rf);
        });
    },[depsFoo, upDateDeps]);
    useEffect(()=>handleUpdate(), [ toggles, handleUpdate ])
};


export const useCacheAndStore = (fname, filepaths)=>{
    const [ocache,setOcache] = useState({...blankDepObj});
    const { toggles:storeTog } = store.getState();
    const [toggles, setToggles] = useState(storeTog);

    const run =  useCallback(() => {
        const { toggles:newTogs } = store.getState();
        if (newTogs[fname] &&   (!ocache || Object.entries(ocache.payload).length === 0)){
            ftDepCacheShallow(fname, filepaths, ocache || {...blankDepObj})
            .then( newDeps => {
                setOcache( ()=>{ return {...newDeps}});
                setToggles(()=>{return {...newTogs}});
             })
            .catch( (err) => console.log(err));
        }
        else if(newTogs[fname] !== toggles[fname] ){
            setToggles(()=>newTogs);
        }
    },[filepaths, fname, ocache, setOcache, toggles]);

    useEffect(()=>store.subscribe(run),[run, toggles]);
    run();
    return [ocache , toggles];
}
/** SKIP **/
/**
export const useCache2 = (fname, filepaths, setOcache,ocache)=>{
    const { toggles } = store.getState();
    const run =  useCallback(() => {
        const { toggles:newTogs } = store.getState();
        if (newTogs[fname] &&   (!ocache[fname] || Object.entries(ocache[fname].payload).length === 0)){
            ftDepCacheShallow(fname, filepaths, ocache[fname] || {...blankDepObj})
            .then( newDeps => {
                setOcache( ()=>{ return {...ocache, [fname]:{...newDeps}}});
             })
            .catch( (err) => console.log(err));
        }
    },[filepaths, fname, ocache, setOcache]);
    useEffect(()=> run(), [toggles, run]);
    return [ocache[fname]];
}
**/
export default connect(mapStateToProps)(FToggle);
