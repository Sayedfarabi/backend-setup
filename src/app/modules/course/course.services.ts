import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchableField } from './course.constant'
import { TCourse, TCourseFaculty } from './course.interface'
import { Course, CourseFaculty } from './course.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = Course.create(payload)
  return result
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisteCourses.course'),
    query,
  )
    .search(courseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await courseQuery.modelQuery
  return result
}

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisteCourses.course')
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisteCourses, ...courseRemaining } = payload

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // step1: basic course info update
    if (courseRemaining) {
      const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
        id,
        courseRemaining,
        { new: true, runValidators: true },
      )

      if (!updatedBasicCourseInfo) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
      }
    }

    if (preRequisteCourses && preRequisteCourses.length > 0) {
      // isDeleted: true, filter and update
      const deletedPreRequisites = preRequisteCourses
        .filter((el: Record<string, unknown>) => el.course && el.isDeleted)
        .map((el: Record<string, unknown>) => el.course)
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        // For Transation
        { session, new: true, runValidators: true },
      )

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
      }
      // isDeleted: false, filter and update
      const newPreRequisites = preRequisteCourses.filter(
        (el: Record<string, unknown>) => el.course && !el.isDeleted,
      )

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisteCourses: { $each: newPreRequisites } },
        },
        { session, new: true, runValidators: true },
      )

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
      }
    }

    const result = await Course.findById(id).populate('preRequisteCourses')
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.commitTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
  }
}

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  )
  return result
}

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  )

  return result
}

const removeFacultiesWithCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      // course: id,
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  )

  return result
}

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
}
