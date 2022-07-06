import * as jwt from 'jsonwebtoken'

import Time from "../../module/Time"
import IToken from '../../types/IToken'
import UserDTO from '../user/user.dto'
import TokenRepository from './token.repository'

class TokenService{

  static generateTokens(payload : UserDTO) : {
    accessToken : string
    refreshToken : string
  }{
    const accessTokenDurabilityMs = Time.convertToMs(+(process.env.ACCESS_TOKEN_DURABILITY as string))
    const refreshTokenDurabilityMs = Time.convertToMs(+(process.env.REFRESH_TOKEN_DURABILITY as string))
    const accessToken = jwt.sign(JSON.parse(JSON.stringify(payload)), process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: String(accessTokenDurabilityMs) + 'ms'})
    const refreshToken = jwt.sign(JSON.parse(JSON.stringify(payload)), process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: String(refreshTokenDurabilityMs) + 'ms'})

    return {
      accessToken,
      refreshToken
    }
  }

  static async saveToken(refreshToken : string, userId : string) : Promise<IToken>{
    const token = await TokenRepository.findToken(userId)

    if(token){
      token.token = refreshToken
      return await token.save()
    }

    const newToken = await TokenRepository.createToken(refreshToken, userId)
    return newToken
  }

  static async removeToken(token : string) : Promise<void>{
    await TokenRepository.removeToken(token)
  }

  static validateAccessToken(token : string) : UserDTO | void{
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
      return (userData as UserDTO)
    } catch (error) {
      return undefined
    }
  }

  static validateRefreshToken(token : string) : UserDTO | void{
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
      return (userData as UserDTO)
    } catch (error) {
      return undefined
    }
  }

}

export default TokenService