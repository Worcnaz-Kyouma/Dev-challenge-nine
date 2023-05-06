import NewPatient from './NewPatient'
import EditPatient from './EditPatient'

import './styles/Clipboard.css'
import { useState } from 'react'

export default function Clipboard(){
    const [ isEnabled, setEnabled ] = useState(false)
    return(
        
        <>
            <div className={isEnabled ? 'clipboard enabled' : 'clipboard'}>
                <button id='clipboard-btn' className={isEnabled ? 'enabled' : ''} onClick={() => setEnabled(bool => !bool)}></button>
                {/*<NewPatient />
                <EditPatient />
    */}
            </div>
        </>
    )
}