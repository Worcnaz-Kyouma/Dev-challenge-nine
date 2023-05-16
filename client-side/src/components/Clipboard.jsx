import NewPatient from './NewPatient'
import EditPatient from './EditPatient'
import './styles/Clipboard.css'

export default function Clipboard(props){

    return(
        <div className={(props.selectedPatient) ? 'pseudo-body enabled' : 'pseudo-body'}>
            <div className={(props.selectedPatient) ? 'clipboard enabled' : 'clipboard'}>
                    <button className={(props.selectedPatient) ? 'clipboard-btn enabled' : 'clipboard-btn'} onClick={() => {
                        props.selectPatient(oldValue => !oldValue ? 'newPatient' : '')
                    }}>
                    </button>
                    {(props.selectedPatient) &&
                    <div className='clipboard-content'>
                    {props.selectedPatient != 'newPatient'
                        ?   <EditPatient pkIdPatient={props.selectedPatient} closeClipboard={() => props.selectPatient('')}/>
                        :   <NewPatient closeClipboard={() => props.selectPatient('')}/>
                    }
                    </div>}
                </div>
        </div>
    )
}