import { useMutation } from '@tanstack/react-query'
import './styles/InputForm.css'

export default function NewPatient(){
    const patientMutation = useMutation({
        mutationFn: (newPatient) => {
            return fetch("http://localhost:22194/patients", {
                    method: "POST",
                    body: JSON.stringify(newPatient),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                }).then((res) => res.json())
        },
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
            {patientMutation.data?.error && 
            /*<ErrorMessage erroresponse={patientMutation.data.error} /> */
            <p id='error'>
                {patientMutation.data.error.type == 'UniqueConstraintError' && patientMutation.data.error.field.includes('dsEmail')
                    ? 'This email is already in use!'
                    :  patientMutation.data.error.message
                }
            </p>
            }

            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input type="text" id="nmPatient" name="nmPatient" placeholder=' ' required/>
                    <label htmlFor="nmPatient">Nome</label>
                </div>

                <div className="input-wrapper">
                    <input type="date" id="dtBorn" name="dtBorn" placeholder=' ' required max={
                        (() => {
                            let date = new Date();
                            date.setDate(date.getDate() + 1)
                    
                            return date.toJSON().slice(0,10)
                        })()
                    }/>
                    <label htmlFor="dtBorn">Data de nascimento</label>
                </div>

                <div className="input-wrapper">
                    <input type="email" id="dsEmail" name="dsEmail" placeholder=' ' required/>
                    <label htmlFor="dsEmail">Email</label>
                </div>
                

                <div className="input-wrapper">
                    <input type="text" id="nmCountry" name="nmCountry" placeholder=' ' required/>
                    <label htmlFor="nmCountry">Pais</label>
                </div>

                <div className="input-wrapper">
                    <input type="text" id="nmCity" name="nmCity" placeholder=' '/>
                    <label htmlFor="nmCity">Cidade</label>
                </div>

                <div className="input-wrapper">
                    <input type="text" id="nmDistrict" name="nmDistrict" placeholder=' '/>
                    <label htmlFor="nmDistrict">Bairro</label>
                </div>

                <div className="input-wrapper">
                    <input type="text" id="dsAddress" name="dsAddress" placeholder=' ' required/>
                    <label htmlFor="dsAddress">Endereço</label>
                </div>

                <div className="input-wrapper">
                    <input type="number" id="nrAddress" name="nrAddress" placeholder=' '/>
                    <label htmlFor="nrAddress">Numero</label>
                </div>

                <div className="input-wrapper">
                    <input type="text" id="dsComplement" name="dsComplement" placeholder=' '/>
                    <label htmlFor="dsComplement">Complemento</label>
                </div>

                <div className="input-wrapper">
                    <input type="text" id="cdCep" name="cdCep" placeholder=' '/>
                    <label htmlFor="cdCep">Cep</label>
                </div>

                <div className="input-wrapper">
                    <input type="text" id="cdUf" name="cdUf" placeholder=' '/>
                    <label htmlFor="cdUf">UF</label>
                </div>
                
            <button type="submit" value="Submit">Submit</button>
            </form>
        </>
    )
}