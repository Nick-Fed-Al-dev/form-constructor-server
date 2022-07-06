import * as express from 'express'
import * as validator from 'express-validator'

class ApiError extends Error{
  
  message: string
  code: number

  constructor(message : string, code : number){
    super()
    this.message = message
    this.code = code
  }

  static badRequest(message = "bad request") : ApiError{
    throw new ApiError(message, 400)
  }

  static unauthorized() : ApiError{
    throw new ApiError('Unauthorized', 401)
  }

  static notFound(message = 'resource not found') : ApiError{
    throw new ApiError(message, 404)
  }

  static checkValidation(req : express.Request) : void | ApiError{
    const result = validator.validationResult(req)
    if(!result.isEmpty()){
      this.badRequest(result.array()[0].msg)
    }
  }
}

export default ApiError