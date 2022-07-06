import * as mongoose from 'mongoose'

import IToken from '../../types/IToken'
import Token from './token.model'

class TokenRepository{

  static async findToken(userId : string) : Promise<IToken>{
    const token = await Token.findOne({user: userId})
    return token
  }

  static async createToken(refreshToken : string, userId : string) : Promise<IToken>{
    const token = await Token.create({token: refreshToken, user: userId})
    return token
  }

  static async removeToken(token : string) : Promise<void>{
    await Token.remove({token})
  }
}

export default TokenRepository