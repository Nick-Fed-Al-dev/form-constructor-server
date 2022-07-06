class ApiResponse{
  
  message : string
  code : number
  data? : any

  constructor(message : string, code : number, data? : any){
    this.message = message
    this.code = code
    this.data = data
  }

}

export default ApiResponse