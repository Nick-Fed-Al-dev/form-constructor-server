import IForm from "../../types/IForm";
import FormRepository from "./form.repository";

class FormService{

  static async getForms() : Promise<IForm[]>{
    const forms = await FormRepository.getForms()
    return forms
  }

  static async getForm(id : string) : Promise<IForm>{
    const form = await FormRepository.getForm(id)
    return form
  }

  static async createForm(formData : IForm) : Promise<IForm>{
    const form = await FormRepository.createForm(formData)
    return form
  }

  static async updateForm(id : string, formData : IForm) : Promise<IForm>{
    const form = await FormRepository.updateForm(id, formData)
    return form
  }

  static async removeForm(id : string) : Promise<void>{
    await FormRepository.removeForm(id)
  }

}

export default FormService