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

const FToggle = ({fname, toggles, children })=>{
    return <> { !fname || toggles[fname] ? children : null }</>
}

export default connect(mapStateToProps)(FToggle)
