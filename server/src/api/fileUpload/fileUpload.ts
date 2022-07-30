import { Router, Request, Response } from 'express';
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.post('/upload', upload.array("files"), async (req: Request, res: Response) => {
    let response;
    if (req.files) {
        const files: any = req.files
        files?.forEach((file: any) => {
            console.log(file.buffer);
        });
    }
    res.status(200).json(response)
})

export default router;