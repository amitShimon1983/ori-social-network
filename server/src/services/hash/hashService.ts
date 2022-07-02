import bcrypt from "bcrypt";
export class HashService {

    private static instance: HashService;

    static getInstance() {
        if (!HashService.instance) {
            HashService.instance = new HashService()
        }
        return HashService.instance;
    }

    async hash(value: string) {
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        return await bcrypt.hash(value, salt);
    }

    async compare(valueA: string, valueB: string) {
        return await bcrypt.compare(valueA, valueB);
    }
}

export default HashService.getInstance();