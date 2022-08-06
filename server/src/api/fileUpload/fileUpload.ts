import { Router, Request, Response } from 'express';
import multer from "multer";
import path from 'path';
import { fileService, jwtService } from '../../services';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage })
const router = Router();

router.post('/upload', upload.array("files"), async (req: Request, res: Response) => {
    let response;
    if (req.files) {
        const files = req.files
        const user = jwtService.getCookieData(req.cookies.user);
        if (user) { await fileService.saveAll(files as Express.Multer.File[], user) }
    }
    res.status(200).json(response)
})
router.get('/all', async (req: Request, res: Response) => {
    const pathTo = path.join(__dirname, '../../../', 'uploads', '1659791809998_your_file_name.webm');
    res.sendFile(pathTo);
})
router.get('/one/:name', async (req: Request, res: Response) => {
    if (req.body) {
        console.log(req.body);
    }

    res.sendFile('../../../uploads');
})
export default router;