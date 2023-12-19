import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableField } from './student.constant'

const getSingleStudentFromDB = async (id: string) => {
  if (await Student.isUserExists(id)) {
    const result = await Student.findOne({ id })
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      })
    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exists')
  }
}

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  if (await Student.isUserExists(id)) {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    }

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value
      }
    }

    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdatedData[`guardian.${key}`] = value
      }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
      for (const [key, value] of Object.entries(localGuardian)) {
        modifiedUpdatedData[`localGuardian.${key}`] = value
      }
    }

    const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    })
    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exists')
  }
}

const deleteStudentsFromDB = async (id: string) => {
  if (await Student.isUserExists(id)) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const deletedStudent = await Student.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true, session },
      )

      if (!deletedStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
      }
      const userId = deletedStudent.user
      const deletedUser = await User.findByIdAndUpdate(
        userId,
        { isDeleted: true },
        { new: true, session },
      )
      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
      }

      await session.commitTransaction()
      await session.endSession()
      return deletedStudent
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await session.abortTransaction()
      await session.endSession()
      throw new AppError(httpStatus.BAD_REQUEST, error.message)
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist')
  }
}

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  return result

  // {email : {$regex : query.searchTerm, $options : "i"}}
  // {presentAddress : {$regex : query.searchTerm, $options : "i"}}
  // {'name.firstName' : {$regex : query.searchTerm, $options : "i"}}

  // const studentSearchableField = ['email', 'name.firstName', 'presentAddress']
  // let searchTerm: string = ''

  // const queryObj = { ...query } // copy
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludeFields.forEach((el) => delete queryObj[el])

  // // console.log({ query }, { queryObj })

  // const filterQuery = searchQuery.find(queryObj)
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // })

  // let sort = '-createdAt'

  // if (query?.sort) {
  //   sort = query.sort as string
  // }

  // const sortQuery = filterQuery.sort(sort)

  // let page = 1
  // let limit = 10
  // let skip = 0

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }

  // if (query.limit) {
  //   limit = Number(query.limit)
  // }
  // // console.log({ page }, { limit }, { skip })

  // const paginateQuery = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit)

  // let fields: string = '-__v'
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldsQuery = await limitQuery.select(fields)

  // return fieldsQuery
}

export const StudentServices = {
  getAllStudentsFromDB,
  deleteStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
}
