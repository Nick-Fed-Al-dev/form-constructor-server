import * as express from 'express'

import ApiError from "../module/ApiError"
import ApiResponse from "../module/ApiResponse"

const responseMiddleware = (data : any, req : express.Request, res : express.Response, next : express.NextFunction) => {

  if (data instanceof Error) {
      console.log(data)
      if (data instanceof ApiError) {
          
          return res
              .status(data.code)
              .json({
                  code: data.code,
                  message: data.message,
              })
      }
      
      return res
          .status(500)
          .json({
              code: 500,
              message: 'server internal error',
              error: data
          })
  }
  if(data instanceof ApiResponse){
    return res
      .status(data.code)
      .json({
          code: data.code,
          message: data.message,
          data: data.data
      })
  }


}

export default responseMiddleware