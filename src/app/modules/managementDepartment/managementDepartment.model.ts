import { Schema, model } from 'mongoose'
import { TManagementDepartment } from './managementDepartment.interface'

const managementDepartmentSchema = new Schema<TManagementDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Management Department is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Management Department Description is required'],
      trim: true,
    },
  },
  { timestamps: true },
)

export const ManagementDepartment = model<TManagementDepartment>(
  'ManagementDepartment',
  managementDepartmentSchema,
)
