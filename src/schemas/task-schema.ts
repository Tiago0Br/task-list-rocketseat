import { z } from 'zod'

export const taskSchema = {
  create: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string'
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
  }),

  getById: z.object({
    id: z
      .string({
        required_error: 'Id is required',
        invalid_type_error: 'Id must be a string'
      })
      .uuid('Id must be a valid uuid')
  }),

  update: z.object({
    id: z
      .string({
        required_error: 'Id is required',
        invalid_type_error: 'Id must be a string'
      })
      .uuid('Id must be a valid uuid'),
    title: z
      .string({
        invalid_type_error: 'Title must be a string'
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string'
      })
      .optional()
  })
}
