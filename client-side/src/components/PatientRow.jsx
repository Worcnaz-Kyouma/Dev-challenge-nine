export default function PatientRow(props){
    return(
            <tr>
                <td>{props.patient.nmPatient}</td>
                <td>{props.patient.dsEmail}</td>
                <td>{props.patient.dtBorn.slice(0,10)}</td>
            </tr>
        
    )
}