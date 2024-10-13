export default {
    API_PORT: process.env.PORT || '3000',
    MONGODB_URI: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'tasks'

}