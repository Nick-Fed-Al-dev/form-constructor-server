import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import router from './router'
import responseMiddleware from '../middleware/response.middleware'
import path from 'path'

const server = express()
dotenv.config()

const corsConfig = {
  origin: "*",
  credentials: true,
}

server.use(cors(corsConfig))
server.use(cookieParser())
server.use(express.json())

server.use('/api', router)
server.use(responseMiddleware)

const PORT : number = +(process.env.PORT as string) || 3333

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"))
})

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