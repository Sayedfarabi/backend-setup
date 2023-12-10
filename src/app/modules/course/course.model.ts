import { Schema, model } from 'mongoose'
import { TCourse, TCourseFaculty, TPreRequisteCourse } from './course.interface'

const preRequisteCourseSchema = new Schema<TPreRequisteCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      unique: true,
      trim: true,
    },
    code: {
      type: Number,
      required: [true, 'Code number is required'],
      unique: true,
    },
    credits: {
      type: Number,
      required: [true, 'Credits is required'],
    },
    prefix: {
      type: String,
      required: [true, 'Prefix is required'],
      trim: true,
    },
    preRequisteCourses: {
      type: [preRequisteCourseSchema],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

courseSchema.statics.isCourseExists = async function (id: string) {
  const existingCourse = await Course.findById(id)
  return existingCourse
}

export const Course = model<TCourse>('Course', courseSchema)

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
})

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
)
