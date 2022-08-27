import { connect } from 'react-redux';

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


export const ToggleImports =  await function (fname, toggles, imports=[]){
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



export default connect(mapStateToProps)(FToggle);

