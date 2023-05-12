import { useState, useRef } from 'react'
import PatientRow from './PatientRow'
import { useQuery } from '@tanstack/react-query'
import ErrorMessage from './ErrorMessage'

export default function PatientsList(){
    const [ patients, setPatients ] = useState(null)
    const [ page, setPage ] = useState(1)
    const [ nmPatientFiltered, setNmPatientFiltered ] = useState('')

    const nmPatientDOMRef = useRef(null)

    const patientQuery = useQuery({
        queryKey: ['patients', { page: page }, { nmPatient: nmPatientFiltered }],
        queryFn: () => {
            return fetch("http://localhost:22194/patients?" + "limit=5" + "&" + "page=" + page + (nmPatientFiltered && ("&" + "nmPatient=" + nmPatientFiltered)))
            .then((res) => res.json())
            .then((resJson) => {
                if(resJson?.error)
                    throw resJson.error
                return resJson
            })
        },
        onSuccess: (data) => {
            setPatients(data.patients.map(patient => <PatientRow />))
        },
        staleTime:  30 * 1000
    })

    return(
        <>
            <main>
                <div className='nmPatient-filter'>
                    <div className='input-wrapper'>
                        <input type="text" name='nmPatientFiltered' id='nmPatientFiltered' ref={nmPatientDOMRef} placeholder=' '/>
                        <label htmlFor="nmPatientFiltered">Nome</label>
                    </div>
                    <button onClick={() => {
                        setNmPatientFiltered(nmPatientDOMRef.current.value)
                    }}>
                        Search
                    </button>
                </div>
                
                <div className='table-wrapper'>
                {patientQuery.isSuccess
                    ?   <>
                            <table>
                                {patients/*patientQuery.data.patients.map(patient => <PatientRow />)*/}
                            </table>
                            <div className='pageControllers-wrapper'>
                                <span>
                                {page} / {patientQuery.data.totalPages}
                                </span>
                                <button disabled={page==1}>
                                    Previous page
                                </button>
                                <button disabled={page==patientQuery.data.totalPages}>
                                    Next page
                                </button>
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