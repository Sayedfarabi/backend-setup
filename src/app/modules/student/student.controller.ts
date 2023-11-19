// import { Student } from './student.interface'
import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body

  try {
    const result = await StudentServices.createStudentIntoDB(studentData)
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)

    // res.status(400).json({
    //   success: false,
    //   message: error.message
    // })
  }
}

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      succrss: true,
      message: 'Students is get successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentControllers = {
  createStudent,
  getStudents,
}
