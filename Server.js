const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const ConnecteDB = require('./db/db')
const indexRoute = require('./routes/indexRoutes')
const userRoute = require('./routes/usersRoutes')
const authRoute = require('./routes/authRoutes')
const mapingRoutes = require('./routes/mapingRoutes')
const Save = require('./save')
const data = require('./db/users')
const bodyParser = require('body-parser');
class Server {
    app
    constructor() {
        this.app = express()
        this.config()
        this.routes()
        ConnecteDB()

    }

    config() {
        this.app.use(morgan('dev'))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use('/images', express.static('images'))
        this.app.set('views', './views')
        this.app.set('view engine', 'ejs')
        this.app.set('PORT', process.env.port || 3001)
    }

    routes() {
        this.app.use('/', indexRoute);
        this.app.use('/justiceci/api/v1', userRoute);
        this.app.use('/authentication', authRoute)
        this.app.use('/maping', mapingRoutes)

    }

    start() {
        this.app.listen(this.app.get('PORT'), () => {
            console.log('Server on port', this.app.get('PORT'));
        });
    }
}

const server = new Server()

server.start()