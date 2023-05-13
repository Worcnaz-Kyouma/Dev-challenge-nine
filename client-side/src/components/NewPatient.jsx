import { useMutation } from '@tanstack/react-query'
import ErrorMessage from './ErrorMessage'
import './styles/NewEditPatient.css'

export default function NewPatient(props){
    const patientMutation = useMutation({
        mutationFn: (newPatient) => {
            return fetch("http://localhost:22194/patients", {
                    method: "POST",
                    body: JSON.stringify(newPatient),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then((res) => res.json())
                .then((resJson) => {
                    if(resJson?.error)
                        throw resJson.error
                    return resJson
                })
        },
        onSuccess: props.closeClipboard
    })

    function handleSubmit(event){
        event.preventDefault()
    
        const form = event.target
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())
    
        patientMutation.mutate(formJson)
    }
    
    return(
        <>
            {(patientMutation.isError) && <ErrorMessage errorResponse={patientMutation.error} />}

            <h1 className='form-title'>Novo paciente</h1>

            <form onSubmit={handleSubmit}>
                <div className='personal-data'>
                    <div id='nmPatient-wrapper' className="form-input-wrapper">
                        <input type="text" id="nmPatient" name="nmPatient" className='form-input' placeholder=' ' required/>
                        <label htmlFor="nmPatient" className='form-label'>Nome</label>
                    </div>
                    <div id='dtBorn-wrapper' className="form-input-wrapper">
                        <input type="date" id="dtBorn" name="dtBorn" className='form-input' placeholder=' ' required max={new Date().toISOString().slice(0,10)}/>
                        <label htmlFor="dtBorn" className='form-label'>Data de nascimento</label>
                    </div>
                    <div id='dsEmail-wrapper' className="form-input-wrapper">
                        <input type="email" id="dsEmail" name="dsEmail" className='form-input' placeholder=' ' required/>
                        <label htmlFor="dsEmail" className='form-label'>Email</label>
                    </div>
                </div>
                

                <div className='location-data'>
                    <div id='nmCountry-wrapper' className="form-input-wrapper">
                        <input type="text" id="nmCountry" name="nmCountry" className='form-input' placeholder=' ' required/>
                        <label htmlFor="nmCountry" className='form-label'>Pais</label>
                    </div>
                    <div id='nmCity-wrapper' className="form-input-wrapper">
                        <input type="text" id="nmCity" name="nmCity" className='form-input' placeholder=' '/>
                        <label htmlFor="nmCity" className='form-label'>Cidade</label>
                    </div>
                    <div id='nmDistrict-wrapper' className="form-input-wrapper">
                        <input type="text" id="nmDistrict" name="nmDistrict" className='form-input' placeholder=' '/>
                        <label htmlFor="nmDistrict" className='form-label'>Bairro</label>
                    </div>
                    <div id='dsAddress-wrapper' className="form-input-wrapper">
                        <input type="text" id="dsAddress" name="dsAddress" className='form-input' placeholder=' ' required/>
                        <label htmlFor="dsAddress" className='form-label'>Endereço</label>
                    </div>
                    <div id='nrAddress-wrapper' className="form-input-wrapper">
                        <input type="number" id="nrAddress" name="nrAddress" className='form-input' placeholder=' '/>
                        <label htmlFor="nrAddress" className='form-label'>Numero</label>
                    </div>
                    <div id='dsComplement-wrapper' className="form-input-wrapper">
                        <input type="text" id="dsComplement" name="dsComplement" className='form-input' placeholder=' '/>
                        <label htmlFor="dsComplement" className='form-label'>Complemento</label>
                    </div>
                    <div id='cdCep-wrapper' className="form-input-wrapper">
                        <input type="text" id="cdCep" name="cdCep" className='form-input' placeholder=' '/>
                        <label htmlFor="cdCep" className='form-label'>Cep</label>
                    </div>
                    <div id='cdUf-wrapper' className="form-input-wrapper">
                        <input type="text" id="cdUf" name="cdUf" className='form-input' placeholder=' '/>
                        <label htmlFor="cdUf" className='form-label'>UF</label>
                    </div>
                </div>
                
                <button type="submit" value="Submit" id='submit-btn'>Submit</button>
            </form>
        </>
    )
}