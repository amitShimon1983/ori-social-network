import { MongoStorage } from "../../../model"


export const initDb = async (connectionString: string) => {
    if (!connectionString) {
        throw new Error('No connection string was supply')
    }
    const db = new MongoStorage(connectionString);
    return await db.connect()
}