interface IStatus {
    OK: number;
    CREATED: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    NOT_FOUND: number;
    UNPROCESSABLE_ENTITY: number;
    INTERNAL_ERROR: number;
}

export const HTTP_STATUS_CODES: IStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_ERROR: 500,
};
