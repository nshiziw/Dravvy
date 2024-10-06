import { useState } from 'react'
import { ZodSchema } from 'zod'
import { getZodErrorMessage } from '@/lib/utils'

interface UseFormValidationProps<T> {
  schema: ZodSchema
  onSubmit: (data: T) => void | Promise<void>
}

export function useFormValidation<T>({ schema, onSubmit }: UseFormValidationProps<T>) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = async (data: unknown) => {
    try {
      setError(null)
      setIsSubmitting(true)
      const validatedData = await schema.parseAsync(data)
      await onSubmit(validatedData as T)
    } catch (err) {
      setError(getZodErrorMessage(err))
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    error,
    isSubmitting,
    validate,
  }
} 