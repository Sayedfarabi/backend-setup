import { Request, Response } from 'express'
// import userZodValidationSchema from './user.zod.validation'
import { UserServices } from './user.services'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body

    // const zodParseData = userZodValidationSchema.parse(studentData)

    const result = await UserServices.createStudentIntoDB(password, studentData)
    res.status(200).json({
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

export const UserControllers = {
  createStudent,
}
