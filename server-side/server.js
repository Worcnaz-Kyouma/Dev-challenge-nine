const server = require('./config/express')
const port = 22194
const routes = require('./api/routes')

server.get('/', (req, res) => {
    let endPoints = {
        endPoints: {
            POST: '/patients',
            GET: [
                '/patients', 
                '/patients/:pkIdPatient'
            ],
            PUT: '/patients/:pkIdPatient',
            DELETE: '/patients/:pkIdPatient',
        }
    }

    res.json(endPoints)
})

server.use('/', routes)

server.listen(port, ()=>{
    console.log('Server running in port ' + port)
})
