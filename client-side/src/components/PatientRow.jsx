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
                            }}>Deletar</button></td>
                        </tr>

                    :   <tr className="patient-delete">
                            <td colSpan={'100%'}>
                                <div>
                                    <span>Você realmente deseja deletar o paciente <b>{props.patient.nmPatient}</b>?</span>
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        patientMutation.mutate()
                                    }}>Sim!</button>
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        setDeleteMode(false)
                                    }}>Não</button>
                                </div>
                            </td>
                        </tr>
                
            
        
    )
}