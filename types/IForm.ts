import * as mongoose from "mongoose";

interface IForm extends mongoose.Document{
  _id?: string
  user: string
  title: string
  questions: {
    body: string
    number: number
    answers: {
      body: string
      number: number
    }[]
  }[]
}

export default IForm