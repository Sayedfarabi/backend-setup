import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TAdmin } from './admin.interface'
import { Admin } from './admin.model'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableField } from './admin.constants'
import { User } from '../user/user.model'

const updateAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  if (await Admin.isUserExists(id)) {
    const { name, ...remainingAdminData } = payload

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingAdminData,
    }

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value
      }
    }

    const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    })
    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exists')
  }
}

const deleteAdminFromDB = async (id: string) => {
  if (await Admin.isUserExists(id)) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const deletedAdmin = await Admin.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true, session },
      )

      if (!deletedAdmin) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin')
      }
      const userId = deletedAdmin.user
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
      return deletedAdmin
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await session.abortTransaction()
      await session.endSession()
      throw new AppError(httpStatus.BAD_REQUEST, error.message)
    }
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exist')
  }
}

const getSingleAdminFromDB = async (id: string) => {
  if (await Admin.isUserExists(id)) {
    const result = await Admin.findById(id).populate('managementDepartment')
    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exists')
  }
}

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Admin.find().populate('managementDepartment'),
    query,
  )
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  return result
}

export const adminServices = {
  updateAdminFromDB,
  deleteAdminFromDB,
  getSingleAdminFromDB,
  getAllAdminFromDB,
}
