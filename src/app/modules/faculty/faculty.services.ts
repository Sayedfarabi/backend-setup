import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableField } from './faculty.constant'
import { User } from '../user/user.model'

const updateFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
  if (await Faculty.isUserExists(id)) {
    const { name, ...remainingFacultyData } = payload

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingFacultyData,
    }

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value
      }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    })
    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty does not exists')
  }
}

const deleteFacultyFromDB = async (id: string) => {
  if (await Faculty.isUserExists(id)) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const deletedFaculty = await Faculty.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true, session },
      )

      if (!deletedFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty')
      }
      const userId = deletedFaculty?.user
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
      return deletedFaculty
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await session.abortTransaction()
      await session.endSession()
      throw new AppError(httpStatus.BAD_REQUEST, error.message)
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty does not exist')
  }
}

const getSingleFacultyFromDB = async (id: string) => {
  if (await Faculty.isUserExists(id)) {
    const result = await Faculty.findById(id).populate('name')
    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty does not exists')
  }
}

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Faculty.find().populate('name'), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  return result
}

export const facultyServices = {
  updateFacultyFromDB,
  deleteFacultyFromDB,
  getSingleFacultyFromDB,
  getAllFacultiesFromDB,
}
