const cors = require('cors');
const express = require('express');
const { dbConnection } = require('./../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Conectarse a Base de Datos
        this.conectarDB()

        // Middleware
        this.middlewares()

        // Rutas de mi aplicación
        this.routes() 
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del Body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        // this.app.use(this.usuariosPath, require('../routes/clientes'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server