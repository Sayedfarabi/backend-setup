import { NextFunction, Request, Response } from 'express'

export const parseJSON = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  }
}
