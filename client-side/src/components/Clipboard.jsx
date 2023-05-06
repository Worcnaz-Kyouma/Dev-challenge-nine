import NewPatient from './NewPatient'
import EditPatient from './EditPatient'

import './styles/Clipboard.css'
import { useState, useEffect } from 'react'

export default function Clipboard(props){
    const [ isEnabled, setEnabled ] = useState('')

    useEffect(()=>{
        if(props.pkIdPatient)
            setEnabled('enabled')
    }, [ props.pkIdPatient ])

    return(
        <>
            <div className={'clipboard ' + isEnabled}>
                <button className={'clipboard-btn ' + isEnabled} onClick={() => {
                    setEnabled(oldValue => (!oldValue) ? 'enabled' : '')
                    props.deselectPatient()
                }}> 
                </button>

                {(isEnabled) && <div className='clipboard-content'>
                {props.pkIdPatient
                    ?   <EditPatient pkIdPatient={props.pkIdPatient}/>

                    :   <NewPatient />
                }
                </div>}
            </div>
        </>
    )
}