import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectSchema } from "joi";

import { HTTP_STATUS } from "../../../constants/httpConstants";

interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}


export const validateRequest = (
    schemas: RequestSchemas,
    options: ValidationOptions = {}
): RequestHandler => {
    // stripParams - Usually don't strip params as they're route-defined
    const defaultOptions = {
        stripBody: true,
        stripQuery: true,
        stripParams: false,
        ...options,
    };

    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const errors: string[] = [];

        
            const validatePart = (
                schema: ObjectSchema,
                data: any,
                shouldStrip: boolean
            ) => {
                const { error, value } = schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: shouldStrip,
                });

                if (error) {
                    errors.push(
                        ...error.details.map(
                            (detail) => `${detail.message}`
                        )
                    );
                } else if (shouldStrip) {
                    return value;
                }
                return data;
            };

            // Validate each request part if schema is provided
            if (schemas.body) {
                req.body = validatePart(
                    schemas.body,
                    req.body,
                    defaultOptions.stripBody
                );
            }

            if (schemas.params) {
                const validatedParams = validatePart(
                    schemas.params,
                    req.params,
                    defaultOptions.stripParams
                );
                Object.assign(req.params, validatedParams);
            }

            if (schemas.query) {
                const validatedQuery = validatePart(
                    schemas.query,
                    req.query,
                    defaultOptions.stripQuery
                );
                Object.assign(req.params, validatedQuery);
            }

            // If there are any validation errors, return them
            if (errors.length > 0) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    error: `Validation error: ${errors.join(", ")}`,
                });
                return;
            }

            next();
        } catch (error: unknown) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: (error as Error).message,
            });
        }
    };
};