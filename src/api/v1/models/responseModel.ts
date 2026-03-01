export interface ApiResponse<T> {
    message?: string;
    data?: T;
    error?: string;
    code?: string;
}


export const successResponse = <T>(
    message?: string,
    data?: T    
): ApiResponse<T> => ({
    message,
    data,
});