export default {
    API_PORT: process.env.PORT || '3000',
    MONGODB_URI: process.env.MONGODB_URL || 'mongodb://admin:67890000@localhost:27017',
    DB_NAME: process.env.DB_NAME || 'backend',
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token',
    JWT_EXPIRY: 1 * 240 * 60

}