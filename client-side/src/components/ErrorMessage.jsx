import './styles/ErrorMessage.css'

export default function ErrorMessage(props){
    const error = {
        type: props.errorResponse.type,
        field: props.errorResponse.field,
        message: props.errorResponse.message
    }

    //Specific errors
    if(error.type == 'UniqueConstraintError' && error.field.includes('dsEmail')){
        error.type = 'Invalid Email'
        error.message = 'Email already assigned to another patient!'
    }
    
    if(error.message == 'Failed to fetch'){
        error.type = 'Network'
        error.message = 'Failed to connect into the server'
    }
    
    return(
        <div className="error">
            <h1 className='error-title'>
                {error.type}
            </h1>
            <p className='error-message'>
                {error.message}
            </p>
        </div>
    )
}