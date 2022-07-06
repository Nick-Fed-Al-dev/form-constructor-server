import * as express from 'express'

import Time from '../../module/Time'
import ApiError from '../../module/ApiError'
import ApiResponse from '../../module/ApiResponse'
import IUser from '../../types/IUser'
import UserService from './user.service'

class UserController{

  private static _setRefreshTokenCookie(res : express.Response, token : string) : void{
    res.cookie(
      'refreshToken',
      token,
      {
        maxAge: Time.convertToMs(+(process.env.REFRESH_TOKEN_DURABILITY as string)),
        httpOnly: true
      }
    )
  }
  
  static async register(req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void>{
    try {
      ApiError.checkValidation(req)
      const userData : IUser = req.body
      const user = await UserService.register(userData)
      UserController._setRefreshTokenCookie(res, user.refreshToken)
      next(new ApiResponse('register successfull', 200, {...user, refreshToken: undefined}))
    } catch (error) {
      next(error)
    }
  }

  static async login(req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void>{
    try {
      ApiError.checkValidation(req)
      const {email, password} = req.body
      const user = await UserService.login(email, password)
      UserController._setRefreshTokenCookie(res, user.refreshToken)
      next(new ApiResponse('login successfull', 200, {...user, refreshToken: undefined}))
    } catch (error) {
      next(error)
    }
  }

  static async refresh(req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void>{
    try {
      ApiError.checkValidation(req)
      const { refreshToken } = req.cookies
      const userData = await UserService.refresh(refreshToken)
      UserController._setRefreshTokenCookie(res, refreshToken)
      next(new ApiResponse('refresh successfull', 200, {...userData, refreshToken: undefined}))
    } catch (error) {
      next(error)
    }
  }

  static async logout(req : express.Request, res : express.Response, next : express.NextFunction) : Promise<void>{
    try {
      ApiError.checkValidation(req)
      const { refreshToken } = req.cookies
      await UserService.logout(refreshToken)
      res.clearCookie('refreshToken')
      next(new ApiResponse('logout successfull', 200))
    } catch (error) {
      next(error)
    }
  }
}

export default UserController