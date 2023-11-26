import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentZodValidationSchema from './student.Zod.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const zodParseData = studentZodValidationSchema.parse(studentData)
    const result = await StudentServices.createStudentIntoDB(zodParseData)
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
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

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      succrss: true,
      message: 'User fetched successfully',
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

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentsFromDB(studentId)
    res.status(200).json({
      succrss: true,
      message: 'Students is deleted successfully',
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

export const StudentControllers = {
  createStudent,
  getStudents,
  deleteStudent,
}
