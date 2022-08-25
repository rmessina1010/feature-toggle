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

const FToggle = ({fname, toggles, children })=>{
    return <> { !fname || toggles[fname] ? children : null }</>
}

export const ToggleImports =  async (fname, toggles, imports=[])=>{
     if (!toggles[fname]) { return Promise.reject(`${fname} isn't ON`); }
    const imported = await Promise.all(imports.map(imp=> import(`../${imp.path}`)));
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

