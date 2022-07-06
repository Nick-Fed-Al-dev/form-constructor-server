import IForm from "../../types/IForm"

class FormDTO{

  id? : string
  user : string
  title : string
  questions : {
    body : string
    number : number
    answers : {
      body : string
      number : number
    }[]
  }[]

  constructor(formData : IForm){
    this.id = formData._id as string
    this.title = formData.title
    this.user = formData.user
    this.questions = formData.questions
  }
}

export default FormDTO