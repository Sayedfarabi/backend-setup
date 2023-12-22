/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemister/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utls'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'

const createStudentIntoDB = async (
  password: string,
  payload: TStudent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string)

  // set user role
  userData.role = 'student'
  userData.email = payload.email
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

    // send image to cloudinary
    const imageName = `${payload?.name?.firstName}-${userData.id}`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { secure_url }: any = await sendImageToCloudinary(
      file.path,
      imageName,
    )

    // create a user (transaction 1)
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id, _id as user
    payload.id = newUser[0].id // embaded id
    payload.user = newUser[0]._id // reference _id
    payload.profileImg = secure_url // cloudinary url

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

const createFacultyIntoDB = async (
  password: string,
  payload: TFaculty,
  file: any,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string)

  // set user role
  userData.role = 'faculty'
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // For id generate
    userData.id = await generateFacultyId()
    // create a user (transaction 1)
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // send image to cloudinary
    const imageName = `${payload?.name?.firstName}-${userData.id}`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { secure_url }: any = await sendImageToCloudinary(
      file.path,
      imageName,
    )

    // set id, _id as user
    payload.id = newUser[0].id // embed id
    payload.user = newUser[0]._id // reference _id
    payload.profileImg = secure_url // cloudinary url

    // create a faculty (transaction 2)
    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()
    return newFaculty
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

const createAdminIntoDB = async (
  password: string,
  payload: TAdmin,
  file: any,
) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_pass as string)
  userData.role = 'admin'
  userData.email = payload?.email
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    userData.id = await generateAdminId()
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // send image to cloudinary
    const imageName = `${payload?.name?.firstName}-${userData.id}`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { secure_url }: any = await sendImageToCloudinary(
      file.path,
      imageName,
    )

    payload.id = newUser[0].id // embed id
    payload.user = newUser[0]._id // reference _id
    payload.profileImg = secure_url // cloudinary url

    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    await session.commitTransaction()
    await session.endSession()
    return newAdmin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

const getMeFromDB = async (userId: string, role: string) => {
  // console.log(userId, role)
  let result = null

  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user')
  }

  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user')
  }

  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user')
  }

  return result
}

const changeuserStatusFromDB = async (
  userId: string,
  payload: { status: string },
) => {
  if (!(await User.isUserExistsByCustomId(userId))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists!')
  }
  const result = await User.findOneAndUpdate({ id: userId }, payload, {
    new: true,
  })
  return result
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeuserStatusFromDB,
}
