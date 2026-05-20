import z from 'zod'

const envSchema = z.object({
	VITE_API_URL: z.url(),
	VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
})

const env = envSchema.parse(import.meta.env)

export { env }
