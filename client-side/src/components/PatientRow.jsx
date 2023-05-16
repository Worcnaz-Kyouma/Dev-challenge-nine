import { useState } from "react"

import './styles/PatientRow.css'
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function PatientRow(props){
    const queryClient = useQueryClient()

    const patientMutation = useMutation({
        mutationFn: () => {
            return fetch("http://localhost:22194/patients/" + props.patient.pkIdPatient, {
                method: "DELETE"
            })
        },
        onSuccess: () => queryClient.invalidateQueries(["patients"])
    })

    const [ deleteMode, setDeleteMode ] = useState(false)

    return(
                !deleteMode
                    ?   <tr className="patient-row" onClick={props.selectPatient}>
                            <td>{props.patient.nmPatient}</td>
                            <td>{props.patient.dsEmail}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'} ).format(new Date(props.patient.dtBorn))}</td>
                            <td><button onClick={(e) => {
                                e.stopPropagation()
                                setDeleteMode(true)
                            }}>Delete</button></td>
                        </tr>

                    :   <tr className="patient-delete">
                            <td colSpan={'100%'}>
                                <div>
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
                            </td>
                        </tr>
                
            
        
    )
}