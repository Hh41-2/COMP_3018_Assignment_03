import Joi from "joi";

// Post operation schemas organized by request part
export const eventSchemas = {
    // POST /events - Create new event
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                "any.required": "\"name\" is required",
                "string.base": "\"name\" must be string",
                "string.min": "\"name\" must be at least 3 characters",
            }),
            date: Joi.date().greater('now').required().messages({
              "date.greater": "\"date\" must be greater than now"
            }),
            capacity: Joi.number().min(5).precision(0).required().messages({
                "any.required": "\"capacity\" must be greater than or equal to 5",
                "number.min": "\"capacity\" must be greater than or equal to 5",
                "number.base": "\"capacity\" must be greater than or equal to 5",
                "number.precision": "\"capacity\" must be an integer",
            }),
            registrationCount: Joi.number().max(Joi.ref('capacity')).optional().messages({
                "number.max": "\"registrationCount\" must be less than or equal to ref:capacity",
            }),
            status: Joi.string().valid("active", "cancelled", "completed").optional().messages({
                "any.only": "\"status\" must be one of [active, cancelled, completed]",
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional().messages({
                "any.only": "\"category\" must be one of [conference, workshop, meetup, seminar, general]",
            }),
        }),
    },

    // GET /events/:id - Get single event
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },

    // PUT /events/:id - Update event
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(3).optional().messages({
                "any.required": "\"name\" is required",
                "string.base": "\"name\" must be string",
                "string.min": "\"name\" must be at least 3 characters",
            }),
            date: Joi.date().greater('now').optional().messages({
              "date.greater": "\"date\" must be greater than now"
            }),
            capacity: Joi.number().min(5).precision(0).optional().messages({
                "any.required": "\"capacity\" must be greater than or equal to 5",
                "number.min": "\"capacity\" must be greater than or equal to 5",
                "number.base": "\"capacity\" must be greater than or equal to 5",
                "number.precision": "\"capacity\" must be an integer",
            }),
            registrationCount: Joi.number().max(Joi.ref('capacity')).optional().messages({
                "number.max": "\"registrationCount\" must be less than or equal to ref:capacity",
            }),
            status: Joi.string().valid("active", "cancelled", "completed").optional().messages({
                "any.only": "\"status\" must be one of [active, cancelled, completed]",
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional().messages({
                "any.only": "\"category\" must be one of [conference, workshop, meetup, seminar, general]",
            }),
       }),
    },

    // DELETE /events/:id - Delete event
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "\"id\" is required",
                "string.empty": "\"id\" cannot be empty",
            }),
        }),
    },
};