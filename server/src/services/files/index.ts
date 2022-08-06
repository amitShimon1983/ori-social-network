
import FileModel from "../../model/schema/file/schema";
import { IFile } from "../../model/schema/file/type";

export class FileHandler {
    private static instance: FileHandler;

    static getInstance() {
        if (!this.instance) {
            this.instance = new FileHandler();
        }
        return this.instance;
    }

    async saveAll(files: Express.Multer.File[]) {
        const newFiles = []
        for (let index = 0; index < files?.length; index++) {
            const file = files[index];
            const newPost: IFile = {
                encoding: file.encoding,
                filename: file.fieldname,
                mimetype: file.mimetype,
                originalname: file.originalname,
                path: file.path,
                size: file.size
            }
            newFiles.push(newPost);
        }
        const dbFiles = await FileModel.insertMany(newFiles)
        return dbFiles;
    }
}

export default FileHandler.getInstance();