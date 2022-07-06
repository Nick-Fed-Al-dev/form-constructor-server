import * as mongoose from "mongoose";

interface INote extends mongoose.Document{
  _id?: string
  user: string
  form: string
  answers: {
    questionNumber: number
    answerNumber: number
  }[]
}

export default INote