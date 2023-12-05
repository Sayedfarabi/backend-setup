import { Router } from 'express'
import { ManagementDepartmentZodValidations } from './managementDepartmentZodValidation'
import validateRequest from '../../middlewares/validateRequest'
import { managementDepartmentControllers } from './managementDepartment.controllers'

const router = Router()

router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentZodValidations.createManagementZodValidationSchema,
  ),
  managementDepartmentControllers.createManagementDepartment,
)
router.patch(
  '/:managementId',
  validateRequest(
    ManagementDepartmentZodValidations.updateManagementZodValidationSchema,
  ),
  managementDepartmentControllers.updateManagementDepartment,
)
router.get(
  '/:managementId',
  managementDepartmentControllers.getSingleManagementDepartment,
)
router.get('/', managementDepartmentControllers.getAllManagementDepartments)

export const ManagementDepartmentRouter = router
