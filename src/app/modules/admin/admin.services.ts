import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TAdmin } from './admin.interface'
import { Admin } from './admin.model'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableField } from './admin.constants'

const updateAdminFromDB = async (adminId: string, payload: Partial<TAdmin>) => {
  if (await Admin.isUserExists(adminId)) {
    const { name, ...remainingAdminData } = payload

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingAdminData,
    }

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value
      }
    }

    const result = await Admin.findOneAndUpdate(
      { id: adminId },
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
      },
    )
    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exists')
  }
}

const deleteAdminFromDB = async (adminId: string) => {
  if (await Admin.isUserExists(adminId)) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const deletedAdmin = await Admin.findOneAndUpdate(
        { id: adminId },
        { isDeleted: true },
        { new: true, session },
      )

      if (!deletedAdmin) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin')
      }
      const deletedUser = await Admin.findOneAndUpdate(
        { id: adminId },
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

const getSingleAdminFromDB = async (adminId: string) => {
  if (await Admin.isUserExists(adminId)) {
    const result = await Admin.findOne({ id: adminId }).populate(
      'managementDepartment',
    )
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
