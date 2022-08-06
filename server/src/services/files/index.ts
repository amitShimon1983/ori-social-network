import PostModel from "../../model/schema/post/schema";
import { IPost } from "../../model/schema/post/type";

export class FileHandler {
    private static instance: FileHandler;

    static getInstance() {
        if (!this.instance) {
            this.instance = new FileHandler();
        }
        return this.instance;
    }

    async saveAll(files: Express.Multer.File[], user: any) {
        const newPosts = []
        for (let index = 0; index < files?.length; index++) {
            const file = files[index];
            const newPost: IPost = {
                encoding: file.encoding,
                filename: file.fieldname,
                mimetype: file.mimetype,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                userId: user._id
            }
            newPosts.push(newPost);
        }
        const posts = await PostModel.insertMany(newPosts);
        console.log(posts);
    }
    // delete(fileName: string) {

    // }
    // get(id: string) {

    // }
    // getAll() {

    // }
}

export default FileHandler.getInstance();