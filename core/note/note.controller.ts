import * as express from 'express'

import NoteService from './note.service'
import ApiError from '../../module/ApiError'
import ApiResponse from '../../module/ApiResponse'
import INote from '../../types/INote'
import NoteDTO from './note.dto'

class NoteController{

  static async getNotes(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      const notes = await NoteService.getNotes()
      const notesDTO = notes.map((note) => new NoteDTO(note))
      next(new ApiResponse('notes were received', 200, notesDTO))
    } catch (error) {
      next(error)
    }
  }

  static async getNote(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      ApiError.checkValidation(req)
      const id : string = req.params.id
      const note = await NoteService.getNote(id)
      const noteDTO = new NoteDTO(note)
      next(new ApiResponse('note was received', 200, noteDTO))
    } catch (error) {
      next(error)
    }
  }

  static async createNote(req : express.Request, res : express.Response, next : express.NextFunction){
    try {
      ApiError.checkValidation(req)
      const noteData : INote = req.body
      const note = await NoteService.createNote(noteData)
      const noteDTO = new NoteDTO(note)
      next(new ApiResponse('note was created', 201, noteDTO))
    } catch (error) {
      next(error)
    }
  }

}

export default NoteController