import * as validator from 'express-validator'

class UserValidator{
  private static _validateEmail(){
    return validator
      .check('email', 'incorrect email format')
      .isEmail()
  }

  private static _validatePassword(){
    return validator
      .check('password', 'password min length is 6')
      .isLength({min: 6})
  }

  private static _validateFirstName(){
    return validator
      .check('firstName', 'first name should have length')
      .isLength({min: 1})
  }

  private static _validateSecondName(){
    return validator
      .check('secondName', 'second name should have length')
      .isLength({min: 1})
  }

  private static _validateAge(){
    return validator
      .check('age', 'age should be a number more then 4 less then 150')
      .isFloat({min: 4, max: 150})
  }

  static validateRegister(){
    return [
      this._validateAge(),
      this._validateEmail(),
      this._validateFirstName(),
      this._validatePassword(),
      this._validateSecondName()
    ]
  }

  static validateLogin(){
    return [
      this._validateEmail(),
      this._validatePassword()
    ]
  }

  static validateCookie(){
    return [
      validator
        .cookie('refreshToken', 'cookies should contain refresh token')
        .isJWT()
    ]
  }
}

export default UserValidator