import express from 'express'
import Mongoose from 'mongoose';
import errorHanddler from './middlewares/errorHanddler';
import url from './config/index'
const app = express();
import router from './routes'
app.use(express.json())
app.use('/api', router)

Mongoose
    .connect(url)
    .then(() => console.log('connected to mongo db..'))
    .catch(err => console.log('error', err))





app.use(errorHanddler)
const APP_PORT = process.env.PORT || 3000
app.listen(APP_PORT, () => console.log(`listening to... ${APP_PORT}`)
)

