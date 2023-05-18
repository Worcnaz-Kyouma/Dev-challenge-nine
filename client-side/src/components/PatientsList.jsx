import { useState, useRef } from 'react'
import PatientRow from './PatientRow'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from './ErrorMessage'

import './styles/PatientsList.css'
import './styles/NmPatientFilter.css'

export default function PatientsList(props){
    const [ page, setPage ] = useState(1)
    const [ nmPatientFiltered, setNmPatientFiltered ] = useState('')

    const nmPatientDOMRef = useRef(null)

    const patientQuery = useQuery({
        queryKey: ['patients', { page: page }, { nmPatient: nmPatientFiltered }],
        queryFn: () => {
            const limit = 8

            return fetch(`http://localhost:22194/patients?limit=${limit}&page=${page}` + (nmPatientFiltered && (
                `&nmPatient=${nmPatientFiltered}`
            )))
            .then((res) => res.json())
            .then((resJson) => {
                if(resJson?.error)
                    throw resJson.error
                return resJson
            })
        },
        keepPreviousData: true,
        staleTime:  30 * 1000
    })

    return(
        <>
            <main className='main-patient'>
                <div className='nmPatient-filter'>
                    <input type="text" name='nmPatientFiltered' id='nmPatientFiltered' ref={nmPatientDOMRef} placeholder='Busque pelo nome do paciente' 
                    onKeyDown={(event) => {
                        if(event.key=='Enter'){
                            setNmPatientFiltered(nmPatientDOMRef.current.value)
                            nmPatientDOMRef.current.blur()
                        }
                    }} />
                    <button onClick={() => {
                        setNmPatientFiltered(nmPatientDOMRef.current.value)
                    }}>
                        Buscar
                    </button>
                </div>
                
                <div className='table-wrapper'>
                {patientQuery.isSuccess
                    ?   <>
                            <table className='table-patient'>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Data de nascimento</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patientQuery.data.patients.map(patient => <PatientRow key={patient.pkIdPatient} selectPatient={() => props.selectPatient(patient.pkIdPatient)} patient={patient}/>)}
                                    <tr id='fill-tr'></tr>
                                </tbody>
                            </table>
                            <div className='pageControllers-wrapper'>
                                <button onClick={() => setPage(oldPage => --oldPage)} disabled={page==1}></button>
                                <span>
                                {page} / {patientQuery.data.totalPages}
                                </span>
                                <button onClick={() => setPage(oldPage => ++oldPage)} disabled={page==patientQuery.data.totalPages}></button>
                            </div>
                        </>
                    :   patientQuery.isLoading
                            ?   <div className='loader'></div>
                            :   <>
                                    <ErrorMessage errorResponse={patientQuery.error} />
                                    <div className='error-content'></div>
                                </>
                }
                </div>
            </main>
        </>
    )
}