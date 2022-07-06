import INote from "../../types/INote";
import NoteRepository from "./note.repository";

class NoteService{

  static async getNotes() : Promise<INote[]>{
    const notes = await NoteRepository.getNotes()
    return notes 
  }

  static async getNote(id : string) : Promise<INote>{
    const note = await NoteRepository.getNote(id)
    return note 
  }

  static async createNote(noteData : INote) : Promise<INote>{
    const note = NoteRepository.createNote(noteData)
    return note
  }

  static async clearFormNotes(formId : string) : Promise<void>{
    await NoteRepository.clearFormNotes(formId)
  }

}

export default NoteService