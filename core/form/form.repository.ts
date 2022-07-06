import IForm from '../../types/IForm'
import Form from './form.model'

class FormRepository{

  static async getForms() : Promise<IForm[]>{
    const forms : IForm[] = await Form.find()
    return forms
  } 

  static async getForm(id : string) : Promise<IForm>{
    const form = await Form.findById(id)
    return form
  }

  static async createForm(formData : IForm) : Promise<IForm>{
    const form = await Form.create(formData)
    return form
  }

  static async updateForm(id : string, formData : IForm) : Promise<IForm>{
    const form = await Form.replaceOne({_id: id}, formData)
    return ({...formData, _id: id} as IForm)
  }

  static async removeForm(id : string) : Promise<void>{
    await Form.remove({_id: id})
  }
}

export default FormRepository