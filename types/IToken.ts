import * as mongoose from 'mongoose'

interface IToken extends mongoose.Document {
  _id: string
  user: string
  token: string
  
} 

export default IToken