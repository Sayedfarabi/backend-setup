import { Schema, model } from 'mongoose'
import { FacultyModel, TFaculty, TUserName } from './faculty.interface'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
})

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'Faculty Id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'User name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'B+', 'AB+', 'O+', 'O-', 'B-', 'A-', 'AB-'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: {
      type: String,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// facultySchema.methods.toJSON = function () {
//   const facultyObject = this.toObject()
//   delete facultyObject?.password
//   return facultyObject
// }

facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id })
  return existingUser
}

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema)
