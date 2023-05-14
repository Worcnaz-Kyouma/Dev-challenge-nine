export default function PatientRow(props){
    return(
            <tr>
                <td>{props.patient.nmPatient}</td>
                <td>{props.patient.dsEmail}</td>
                <td>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'} ).format(new Date(props.patient.dtBorn))}</td>
                <td><button>Delete</button></td>
            </tr>
        
    )
}