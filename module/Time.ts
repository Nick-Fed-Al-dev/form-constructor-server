class Time{
  
  static convertToMs(secs : number){
    return secs * 1000
  }

  static convertToMins(secs : number){
    return secs / 60
  }

  static convertToHours(secs : number){
    return secs / 60 / 60
  }

  static convertToDays(secs : number){
    return secs / 60 / 60 / 24
  }

}

export default Time