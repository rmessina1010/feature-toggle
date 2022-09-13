import FToggle from './toggleSupport'

const FTTest = ()=>{

    return <FToggle fname='f2' old={<p>Ooops!</p>}>
        <p>Test (on).</p>
        <p>If you are reading this:F2 is on, and 'toggles'has been passed without any intermediary</p>
    </FToggle>
}

export default FTTest;