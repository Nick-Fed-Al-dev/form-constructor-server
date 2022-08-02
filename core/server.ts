import * as express from 'express'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import router from './router'
import responseMiddleware from '../middleware/response.middleware'

const server = express()
dotenv.config()

const corsConfig = {
  origin: false,
  credentials: true,
}

server.use(cors(corsConfig))
server.use(cookieParser())
server.use(express.json())

server.use('/api', router)
server.use(responseMiddleware)

const PORT : number = Number(process.env.PORT as string) || 3333

const start = async () : Promise<void> => {
  try {
    await mongoose.connect('mongodb+srv://NikitaFed:benten1011@clusterfirst.w0sik.mongodb.net/form-constructor')
    console.log('data base connected')
    server.listen(PORT, () => {
      console.log(`server was started on port ${PORT}...`)
    })
  } catch (error : any) {
    console.log(error)
    process.exit(1)
  }
}

export default start
