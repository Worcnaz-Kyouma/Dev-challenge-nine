import Header from './Header'
import PatientsList from './PatientsList'
import Clipboard from './Clipboard'

import './styles/Home.css'
import { useState } from 'react'

export default function Home(){
    const [ selectedPatient, selectPatient ] = useState('')

    return(
        <>
            <Header />
            {/*<button onClick={() => selectPatient(1)}>Edit patient 1</button>*/}
            <PatientsList selectPatient={selectPatient}/>
            <Clipboard selectedPatient={selectedPatient} selectPatient={selectPatient}/>
        </>
    )
}