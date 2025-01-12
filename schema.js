const { z } = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'
    }).nonempty(),
    genre: z.array(
        z.enum(['action', 'comedy', 'drama', 'horror', 'sci-fi', 'thriller'])
    ).nonempty(),
    year: z.number().int().min(1900).positive().max(2025),
    director: z.string().nonempty(),
    duration: z.number().positive(),
    rate: z.number().min(0).max(10).optional(),
    poster: z.string().url()
})

function validateMovie (object) {
    return movieSchema.safeParse(object)
}

function validatePartialMovie(input){
    return movieSchema.partial().safeParse(input)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}