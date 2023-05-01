import Header from './components/Header'
import PatientsList from './components/PatientsList'
import Clipboard from './components/Clipboard'

export default function Home(){
    return(
        <>
            <Header />
            <PatientsList />
            <Clipboard />
        </>
    )
}