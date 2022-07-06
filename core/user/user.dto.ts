import IUser from "../../types/IUser"

class UserDTO{

  id : string
  firstName : string
  secondName : string
  lastName : string
  age : number
  email : string

  constructor(user : IUser){
    this.id = user._id as string
    this.firstName = user.firstName
    this.secondName = user.secondName
    this.lastName = user.lastName as string
    this.age = user.age
    this.email = user.email
  }

}

export default UserDTO