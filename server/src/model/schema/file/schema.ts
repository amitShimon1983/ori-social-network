import { model, Schema } from "mongoose";
import { IFile } from "./types";

const fileSchema = new Schema<IFile>({
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number },
});

const FileModel = model<IFile>('File', fileSchema);

export default FileModel;