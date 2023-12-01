import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemister/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utls'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string)

  // set user role
  userData.role = 'student'

  // find admission semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // For checking Admission Semester valid for id generate
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester)
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Admission Semester not found')
    }
    // create a user (transaction 1)
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id, _id as user
    payload.id = newUser[0].id // embaded id
    payload.user = newUser[0]._id // reference _id

    // create a student (transaction 2)
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

export const UserServices = {
  createStudentIntoDB,
}
