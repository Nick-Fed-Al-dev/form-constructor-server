import INote from "../../types/INote";
import Note from './note.model'

class NoteRepository{

  static async getNotes() : Promise<INote[]>{
    const notes = await Note.find()
    return notes
  }

  static async getNote(id : string) : Promise<INote>{
    const note = await Note.findById(id)
    return note
  }

  static async createNote(noteData : INote) : Promise<INote>{
    const note = await Note.create(noteData)
    return note
  }

  static async clearFormNotes(formId : string) : Promise<void>{
    await Note.deleteMany({form: formId})
  }

}

export default NoteRepository