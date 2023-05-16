import { useState } from "react"

import './styles/PatientRow.css'

export default function PatientRow(props){
    const [ deleteMode, setDeleteMode ] = useState(false)
    return(
            <tr className="patient-row" onClick={props.selectPatient}>
                {!deleteMode
                    ?   <>
                            <td>{props.patient.nmPatient}</td>
                            <td>{props.patient.dsEmail}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'} ).format(new Date(props.patient.dtBorn))}</td>
                            <td><button onClick={(e) => {
                                e.stopPropagation()
                                setDeleteMode(true)
                            }}>Delete</button></td>
                        </>
                    :   <div className="delete">
                            <span>Do you really wanna delete {props.patient.nmPatient}?</span>
                            <button onClick={(e) => {
                                e.stopPropagation()
                                patientMutation.mutate()//delete!
                            }}>Yes!</button>
                            <button onClick={(e) => {
                                //setTimeout(() => setDeleteMode(false), 2000)? Para dar um intervalo de 2 segundos para sumirmos com estes dados de maneira chad com css?
                                e.stopPropagation()
                                setDeleteMode(false)
                            }}>No</button>
                        </div>
                }
            </tr>
        
    )
}