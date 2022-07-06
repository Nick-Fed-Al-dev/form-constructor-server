import * as mongoose from 'mongoose'

interface IUser extends mongoose.Document{
  readonly _id?: string
  firstName: string
  secondName: string
  lastName?: string
  age: number
  email: string
  password: string 
}

export default IUser