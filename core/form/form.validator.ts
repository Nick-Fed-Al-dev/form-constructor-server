import * as validator from 'express-validator'

class FormValidator{

  private static _validateUser(){
    return validator
      .check('user', 'form should have user it belongs')
      .isMongoId()
  }

  private static _validateTitle(){
    return validator
      .check('title', 'form should have title')
      .isString()
      .isLength({min: 1})
  }

  private static _validateQuestions(){
    return validator
      .check('questions', 'form should have array of questions')
      .isArray({min: 1})
  }

  private static _validateQuestionBody(){
    return validator
      .check('questions.*.body', 'question should have body')
      .isString()
      .isLength({min: 1})
  }

  private static _validateQuestionAnswers(){
    return validator
      .check('questions.*.answers', 'question should have min 2 answers')
      .isArray({min: 2})
  }

  private static _validateQuestionAnswerBody(){
    return validator
      .check('questions.*.answers.*.body', 'answer should have body')
      .isString()
      .isLength({min: 1})
  }

  static validateForm(){
    return [
      this._validateTitle(),
      this._validateUser(),
      this._validateQuestions(),
      this._validateQuestionBody(),
      this._validateQuestionAnswers(),
      this._validateQuestionAnswerBody()
    ]
  }

  static validateParamId(){
    return [
      validator
        .param('id', 'incorrect form id')
        .isMongoId()
    ]
  }

}

export default FormValidator