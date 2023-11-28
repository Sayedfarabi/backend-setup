import validator from 'validator'
import { Schema, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface'

// import bcrypt from 'bcrypt'
// import config from '../../config'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name can not be more than 20'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    maxlength: [20, 'Middle name can not be more than 20'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: [20, 'Middle name can not be more than 20'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian address is required'],
  },
})

// Main Schema
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    unique: true,
    ref: 'User',
  },
  // password: {
  //   type: String,
  //   required: [true, 'Password is required'],
  //   maxlength: [30, 'Password can not be more than 20 characters'],
  // },
  name: {
    type: userNameSchema,
    required: [true, 'Student Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not supported',
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
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
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian is required'],
  },
  profileImg: {
    type: String,
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

studentSchema.methods.toJSON = function () {
  const studentObject = this.toObject()
  delete studentObject.password
  return studentObject
}

// pre save middleware / hook
// studentSchema.pre('save', async function (next) {
// hashing password and save into DB

// eslint-disable-next-line @typescript-eslint/no-this-alias
// const user = this
// user.password = await bcrypt.hash(
//   user.password,
//   Number(config.bcrypt_salt_rounds),
// )
// next()
// })

// post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//   doc.password = ''
//   next()
// })

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// creating a custom method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
