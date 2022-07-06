import INote from "../../types/INote"

class NoteDTO{

  id : string
  user : string
  form : string
  answers : {
    questionNumber : number
    answerNumber : number
  }[]

  constructor(noteData : INote){
    this.id = noteData._id as string
    this.user = noteData.user
    this.form = noteData.form
    this.answers = noteData.answers
  }

}

export default NoteDTO