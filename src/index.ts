import 'dotenv/config'
import express from 'express'
import { errorHandler } from './common/error-handler.js'
import { indexRouter } from './routes.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log('Using this request', req.body, req.query, req.params)

  next()
})

/* Universal Router for all routes */
app.use(indexRouter)

/* Global Error handler, when use next(error) function */
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
