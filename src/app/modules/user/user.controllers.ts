import httpStatus from 'http-status'

import { NextFunction, Request, Response } from 'express'
// import userZodValidationSchema from './user.zod.validation'
import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body
    // const zodParseData = userZodValidationSchema.parse(studentData)
    const result = await UserServices.createStudentIntoDB(password, studentData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error)
  }
}

export const UserControllers = {
  createStudent,
}
