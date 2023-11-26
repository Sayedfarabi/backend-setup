import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRouter } from './app/modules/user/user.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

// application routes

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/user', UserRouter)

const getAController = (req: Request, res: Response) => {
  const a = 'hello world'
  res.send(a)
}

app.get('/', getAController)

export default app
