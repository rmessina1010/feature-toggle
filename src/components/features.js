import { connect } from 'react-redux';

function mapStateToProps(state) {
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

const FToggle = ({fname, toggles, importPaths=[], children })=>{
    return <> { !fname || toggles[fname] ? children : null }</>
}

export const ToggleImports = async (fname, toggles, importPaths=[])=>{
    return Promise.resolve(`${fname} is null`);
    var loc = window.location.pathname;
 console.log(loc);
    return Promise.all(
        importPaths.map(importPath => import(importPath))
        .push(() => toggles[fname] ?
            Promise.resolve(`${fname} is ON`)
            :Promise.reject(`${fname} isn't ON`)));
}

export default connect(mapStateToProps)(FToggle);

let a = await import("../shared/dep1");
console.log(a)
