

const sendError = (statusCode: number, status: string, message: string) => {
    return {
        statusCode,
        status,
        message,
    };
};

export default sendError;