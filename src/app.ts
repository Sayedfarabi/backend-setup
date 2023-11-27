/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes/routes'
const app: Application = express()

app.use(express.json())
app.use(cors())

// application routes

app.use('/api/v1', router)

const getAController = (req: Request, res: Response) => {
  const a = 'hello world'
  res.send(a)
}

app.get('/', getAController)

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
app.use(globalErrorHandler)
app.use(notFound)
export default app
