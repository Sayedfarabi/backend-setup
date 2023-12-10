import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { courseServices } from './course.services'

const createCourse = catchAsync(async (req, res) => {
  const body = req.body
  const result = await courseServices.createCourseIntoDB(body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.getSingleCourseFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is fatched successfully',
    data: result,
  })
})

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is fatched successfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await courseServices.deleteCourseIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result = await courseServices.updateCourseIntoDB(id, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  })
})

const assignFacultiesIntoCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await courseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assign successfully',
    data: result,
  })
})

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body

  const result = await courseServices.removeFacultiesWithCourseFromDB(
    courseId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assign successfully',
    data: result,
  })
})

export const courseControllers = {
  createCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
  assignFacultiesIntoCourse,
  removeFacultiesFromCourse,
}
