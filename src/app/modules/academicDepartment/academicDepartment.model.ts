import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic Department name is required'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty ObjectId is required'],
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
)

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })
  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `${this.name} is already exists`)
  } else {
    next()
  }
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()

  const isDepartmentExist = await AcademicDepartment.findOne(query)
  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `${query._id} is not exists`)
  } else {
    next()
  }
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
