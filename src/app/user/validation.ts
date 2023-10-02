import { ZodError, z } from 'zod'

export class UserValidation {
  
}
const bodySchema = z.object({
  userName: z.string().min(5).toLowerCase(),
  password: z.string().min(5)
})

try {
  const result = bodySchema.parse({ username: 'NEERAJKUMAR161', password:  ''})
  console.log('Result')
} catch (error) {
  if(error instanceof ZodError) {
      console.log('Its instance of zod error', error.formErrors)
  }
}