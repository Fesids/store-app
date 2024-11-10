export const ok = (data: any, message: string) => ({
    status: '200',
    message: message || 'Success',
    data
})

export const created = (data: any, message: string) => ({
    status: '201',
    message: message || 'Resource created successfully',
    data
});

export const updated = (data: any, message: string) => ({
    status: '200',
    message: message || 'Resource updated successfully',
    data
});

export const deleted = (data: any, message: string) => ({
    status: '200',
    message: message || 'Resource deleted successfully',
    data
});

export const badRequest = (error: any, message: string) => ({
    status: '400',
    message: message || 'Bad request',
    error
});

export const unauthorized = (error: any, message: string) => ({
    status: '401',
    message: message || 'Unauthorized',
    error
});

export const forbidden = (error: any, message: string) => ({
    status: '403',
    message: message || 'Forbidden',
    error
});

export const notFound = (error: any, message: string) => ({
    status: '404',
    message: message || 'Not found',
    error
});

export const internalServerError = (error: any, message: string) => ({
    status: '500',
    message: message || 'Internal server error',
    error
});
