import NewPatient from './NewPatient'
import EditPatient from './EditPatient'

export default function Clipboard(){
    return(
        <>
            <div>
                <NewPatient />
            </div>
            <div>
                <EditPatient />
            </div>
        </>
    )
}