import User from './user.model'
import IUser from '../../types/IUser'

class UserRepository{
  static async findUser(email : string) : Promise<IUser>{
    const user = await User.findOne<IUser>({email})
    return (user as IUser)
  }

  static async createUser(userData : IUser) : Promise<IUser>{
    const user = await User.create(userData)
    return user
  }
} 

export default UserRepository