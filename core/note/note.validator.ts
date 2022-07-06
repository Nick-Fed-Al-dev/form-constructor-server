import * as validator from 'express-validator'

class NoteValidator{

  private static _validateUser(){
    return validator
      .check('user', 'note should user-author')
      .isMongoId()
  }

  private static _validateForm(){
    return validator
      .check('form', 'note should have form it describes')
      .isMongoId()
  }

  private static _validateAnswers(){
    return validator
      .check('answers', 'note should have array of answers')
      .isArray()
      .notEmpty()
  }

  private static _validateAnswerQuestionNumber(){
    return validator
      .check('answers.*.questionNumber', 'every answer should have number of question it answers')
      .isInt({min: 1})
  }

  private static _validateAnswerAnswerNumber(){
    return validator
      .check('answers.*.answerNumber', 'every answer should have number')
  }

  static validateParamId(){
    return validator
      .param('id', 'request should include id parameter')
      .isMongoId()
  }

  static validateNote(){
    return [
      this._validateUser(),
      this._validateForm(),
      this._validateAnswers(),
      this._validateAnswerQuestionNumber(),
      this._validateAnswerAnswerNumber()
    ]
  }

}

export default NoteValidator