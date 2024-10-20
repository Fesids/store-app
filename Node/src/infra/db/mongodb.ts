import { Db, MongoClient, MongoClientOptions } from "mongodb";
import config from "../../config/main"

export const createMongodbConnection = async (host: string, options: MongoClientOptions): Promise<Db> => {
    /*return new Promise((resolve, reject) => {
        MongoClient.connect(host, options, (error, client) => {
            if (error) reject(error);
            resolve(client.db(config.DB_NAME))
        })
    })*/

    try {
        const client = await MongoClient.connect(host, options);
        return client.db(config.DB_NAME);
        } catch (error) {
        throw error; 
        }

}