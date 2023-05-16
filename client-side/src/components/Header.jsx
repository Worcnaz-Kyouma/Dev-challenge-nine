import './styles/Header.css'

export default function Header(){
    return(
        <header>
            <span>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric'} ).format(new Date())}</span>
        </header>
    )
}