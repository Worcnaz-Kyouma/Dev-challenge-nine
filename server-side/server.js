const server = require('./config/express')
const port = 22194
const routes = require('./api/routes')

server.get('/', (req, res) => {
    let welcomeHtml = `
    <h1>Running! Current URI\'s: </h1>
    <br>
    <ul>
        <li>POST:/patients </li>
        <li>DELETE:/patients/:pkIdPatient </li>
        <li>PUT:/patients </li>
        <li>GET:/patients </li>
        <li>GET:/patients/:pkIdPatient </li>
        <li>GET:/patients?limit&page&nmPatient </li>
        <li>GET:/patients/amount </li>
    </ul>
    `
    res.send(welcomeHtml)
})

server.use('/', routes)

server.listen(port, ()=>{
    console.log('Server running in port ' + port)
})
