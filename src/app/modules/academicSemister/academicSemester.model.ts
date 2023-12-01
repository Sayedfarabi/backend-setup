import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  semesterCodes,
  semesterMonths,
  semesterNames,
} from './academicSemisterConstant'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterNames,
      required: [true, 'Semester name is required'],
    },
    code: {
      type: String,
      enum: semesterCodes,
      required: [true, 'Semester code is required'],
    },
    year: {
      type: String,
      required: [true, 'Semester year is required'],
    },
    startMonth: {
      type: String,
      enum: semesterMonths,
      required: [true, 'Semester start month is required'],
    },
    endMonth: {
      type: String,
      enum: semesterMonths,
      required: [true, 'Semester end month is required'],
    },
  },
  {
    timestamps: true,
  },
)

// for semester on the same year duplicate validation
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  })

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semister is already exists')
  } else {
    next()
  }
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
