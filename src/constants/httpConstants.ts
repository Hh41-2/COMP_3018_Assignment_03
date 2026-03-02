export const HTTP_STATUS = {
    OK: 200, // request succeeded
    CREATED: 201, // resource successfully created
    BAD_REQUEST: 400, // HTTP error on a client-side 
    NOT_FOUND: 404, // requested server does not exist 
    INTERNAL_SERVER_ERROR: 500, // unexpected problem
} as const;