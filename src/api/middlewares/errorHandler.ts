import { type Request, type Response, type NextFunction, type ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging purposes
  console.error(err.stack)

  // Set HTTP status code
  const statusCode = err.statusCode ?? 500

  // Send error response
  res.status(statusCode as number).json({
    status: 'error',
    message: err.message ?? 'An unexpected error occurred'
  })
}

export default errorHandler
