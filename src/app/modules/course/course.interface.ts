/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TPreRequisteCourse = {
  course: Types.ObjectId
  isDeleted: boolean
}

export type TCourse = {
  title: string
  prefix: string
  code: number
  credits: number
  preRequisteCourses?: TPreRequisteCourse[]
  isDeleted: boolean
}

export type TCourseFaculty = {
  course: Types.ObjectId
  faculties: [Types.ObjectId]
}

export interface CourseModel extends Model<TCourse> {
  isCourseExists(id: string): Promise<TCourse | null>
}
