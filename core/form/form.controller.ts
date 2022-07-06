import * as express from 'express'

import ApiError from '../../module/ApiError'
import ApiResponse from '../../module/ApiResponse'
import IForm from '../../types/IForm'
import FormDTO from './form.dto'
import FormService from './form.service'
import NoteService from '../note/note.service'

class FormController{

  static async getForms(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      const forms = await FormService.getForms()
      const formsDTO = forms.map(form => new FormDTO(form))
      next(new ApiResponse('forms were received', 200, formsDTO))
    } catch (error) {
      next(error)
    }
  }

  static async getForm(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      ApiError.checkValidation(req)
      const id : string = req.params.id
      const form = await FormService.getForm(id)
      const formDTO = new FormDTO(form)
      next(new ApiResponse('form was received', 200, formDTO)) 
    } catch (error) {
      next(error)
    }
  }

  static async createForm(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      ApiError.checkValidation(req)
      const formData : IForm = req.body
      const form = await FormService.createForm(formData)
      const formDTO = new FormDTO(form)
      next(new ApiResponse('form was created', 201, formDTO))
    } catch (error) {
      next(error)
    }
  }

  static async updateForm(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      ApiError.checkValidation(req)
      const id : string = req.params.id
      const formData : IForm = req.body
      const form = await FormService.updateForm(id, formData)
      const formDTO = new FormDTO(form)
      next(new ApiResponse('form was updated', 200, formDTO))
    } catch (error) {
      next(error)
    }
  }

  static async removeForm(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      ApiError.checkValidation(req)
      const id : string = req.params.id
      await FormService.removeForm(id)
      await NoteService.clearFormNotes(id)
      next(new ApiResponse('form was removed', 200))
    } catch (error) {
      next(error)
    }
  }
}

export default FormController