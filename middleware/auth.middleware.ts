import * as jwt from 'jsonwebtoken'
import * as express from 'express'

import ApiError from '../module/ApiError'
import TokenService from '../core/token/token.service'

const authMiddleware = (req : express.Request, res : express.Response, next: express.NextFunction) => {
	try {
		const token = req.headers?.authorization?.split(" ")[1]
		const userData = TokenService.validateAccessToken(token as string)
		if (!token || !userData) {
			ApiError.unauthorized()
      
		}
    
		(req as any).user = userData
		next()

	} catch (error : any) {
		next(error)
	}
}

export default authMiddleware