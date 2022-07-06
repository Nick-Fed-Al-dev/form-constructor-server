import * as bcrypt from 'bcrypt'

import ApiError from "../../module/ApiError";
import IUser from "../../types/IUser";
import TokenRepository from '../token/token.repository';
import TokenService from "../token/token.service";
import UserDTO from "./user.dto";
import UserRepository from "./user.repository";

class UserService{

  private static async _createTokensFromUser(user : IUser){
    const userDTO = new UserDTO(user)
    const tokens = TokenService.generateTokens(userDTO)
    await TokenService.saveToken(tokens.refreshToken, user.id)
    return { ...tokens, ...userDTO }
  }

  static async register(userData : IUser){
    const candidate = await UserRepository.findUser(userData.email)
 
    if(candidate?._id){
      ApiError.badRequest('user with this email already exist')
    }

    const hashedPassword : string = await bcrypt.hash(userData.password, +(process.env.PASSWORD_HASH_SALT as string))
    userData.password = hashedPassword
    const user = await UserRepository.createUser(userData)
    return await this._createTokensFromUser(user)
  }

  static async login(email : string, password : string){
    const candidate = await UserRepository.findUser(email)

    if(!candidate?._id){
      ApiError.notFound('user with this email not found')
    }

    const isMatch = await bcrypt.compare(password, candidate.password)

    if(!isMatch){
      ApiError.badRequest('incorrect password')
    }

    return this._createTokensFromUser(candidate)
  }

  static async refresh(refreshToken : string){
    if (!refreshToken) {
      ApiError.unauthorized()
    }

    const userData = (TokenService.validateRefreshToken(refreshToken) as UserDTO)
    const dbToken = await TokenRepository.findToken(userData.id)
  
    if (!userData || !dbToken) {
      ApiError.unauthorized()
    }

    const user = await UserRepository.findUser(userData.email)
    return this._createTokensFromUser(user)
  }

  static async logout(token : string) : Promise<void>{
    await TokenRepository.removeToken(token)
  }
}

export default UserService