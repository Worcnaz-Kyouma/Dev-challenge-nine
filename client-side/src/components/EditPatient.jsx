import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ErrorMessage from './ErrorMessage'
import './styles/NewEditPatient.css'

export default function EditPatient(props){
    const queryClient = useQueryClient()

    const patientQuery = useQuery({
        queryKey: ['patients', props.pkIdPatient],
        queryFn: () => {
            return fetch("http://localhost:22194/patients/" + props.pkIdPatient)
            .then((res) => res.json())
            .then((resJson) => {
                if(resJson?.error)
                    throw resJson.error
                return resJson
            })
        },
        staleTime: 1 * 60 * 1000
    })

    const patientMutation = useMutation({
        mutationFn: (editedPatient) => {
            return fetch("http://localhost:22194/patients/" + props.pkIdPatient, {
                    method: "PUT",
                    body: JSON.stringify(editedPatient),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then((res) => res.json())
                .then((resJson) => {
                    if(resJson?.error)
                        throw resJson.error
                    return resJson
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["patients"])
            props.closeClipboard()
        }
    })

    function handleSubmit(event){
        event.preventDefault()
    
        const form = event.target
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())
    
        patientMutation.mutate(formJson)
    }

    if(patientQuery.isFetching) return <div className='loader'></div>

    if(patientQuery.isError) return(
        <>
            <ErrorMessage errorResponse={patientQuery.error} />
            <div className='error-content'></div>
            
        </>
    )
    
    return(
        <>
            {(patientMutation.isError) && <ErrorMessage errorResponse={patientMutation.error} />}

            <h1 className='form-title'>Editar paciente[mudar?]</h1>

            <form className='form-patient' onSubmit={handleSubmit}>
                <div className='personal-data'>
                    <div id='nmPatient-wrapper'>
                        <input type="text" id="nmPatient" name="nmPatient" defaultValue={patientQuery.data.nmPatient} required/>
                        <label htmlFor="nmPatient">Nome</label>
                    </div>
                    <div id='dtBorn-wrapper'>
                        <input type="date" id="dtBorn" name="dtBorn" defaultValue={patientQuery.data.dtBorn.slice(0,10)} required max={new Date().toISOString().slice(0,10)}/>
                        <label htmlFor="dtBorn">Data de nascimento</label>
                    </div>
                    <div id='dsEmail-wrapper'>
                        <input type="email" id="dsEmail" name="dsEmail" defaultValue={patientQuery.data.dsEmail} required/>
                        <label htmlFor="dsEmail">Email</label>
                    </div>
                </div>
                

                <div className='location-data'>
                    <div id='nmCountry-wrapper'>
                        <input type="text" id="nmCountry" name="nmCountry" defaultValue={patientQuery.data.nmCountry} required/>
                        <label htmlFor="nmCountry">Pais</label>
                    </div>
                    <div id='nmCity-wrapper'>
                        <input type="text" id="nmCity" name="nmCity" defaultValue={patientQuery.data.nmCity}/>
                        <label htmlFor="nmCity">Cidade</label>
                    </div>
                    <div id='nmDistrict-wrapper'>
                        <input type="text" id="nmDistrict" name="nmDistrict" defaultValue={patientQuery.data.nmDistrict}/>
                        <label htmlFor="nmDistrict">Bairro</label>
                    </div>
                    <div id='dsAddress-wrapper'>
                        <input type="text" id="dsAddress" name="dsAddress" defaultValue={patientQuery.data.dsAddress} required/>
                        <label htmlFor="dsAddress">Endereço</label>
                    </div>
                    <div id='nrAddress-wrapper'>
                        <input type="number" id="nrAddress" name="nrAddress" defaultValue={patientQuery.data.nrAddress}/>
                        <label htmlFor="nrAddress">Numero</label>
                    </div>
                    <div id='dsComplement-wrapper'>
                        <input type="text" id="dsComplement" name="dsComplement" defaultValue={patientQuery.data.dsComplement}/>
                        <label htmlFor="dsComplement">Complemento</label>
                    </div>
                    <div id='cdCep-wrapper'>
                        <input type="text" id="cdCep" name="cdCep" defaultValue={patientQuery.data.cdCep}/>
                        <label htmlFor="cdCep">Cep</label>
                    </div>
                    <div id='cdUf-wrapper'>
                        <input type="text" id="cdUf" name="cdUf" defaultValue={patientQuery.data.cdUf}/>
                        <label htmlFor="cdUf">UF</label>
                    </div>
                </div>
                
                <button type="submit" value="Submit" id='submit-btn'>
                    Submit
                </button>
            </form>
        </>
    )
}