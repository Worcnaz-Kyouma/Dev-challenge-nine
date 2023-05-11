import { useState } from 'react'
import PatientRow from './PatientRow'
import { useQuery } from '@tanstack/react-query'

export default function PatientsList(){
    const [ patients, setPatients ] = useState(null)
    const [ page, setPage ] = useState(1)
    const [ nmPatientSearched, setNmPatientSearched ] = useState(null)

    const patientQuery = useQuery({
        queryKey: ['patients', { page: page }, { nmPatient: nmPatientSearched }],
        queryFn: () => {
            return fetch("http://localhost:22194/patients?" + "limit=5" + "&" + "page=" + page + nmPatientSearched && ("&" + "nmPatient=" + nmPatientSearched))
            .then((res) => res.json())
            .then((resJson) => {
                if(resJson?.error)
                    throw resJson.error
                return resJson
            })
        },
        staleTime:  30 * 1000
    })
    return(
        <>
            <PatientRow />
            <PatientRow />
        </>
    )
}