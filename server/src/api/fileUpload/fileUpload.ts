import { Router, Request, Response } from 'express';
import path from 'path';
import { fileService, jwtService, postService } from '../../services';
import { upload } from '../../app/middleware/uploadMiddleware';
const router = Router();

router.post('/upload', upload.array("files"), async (req: Request, res: Response) => {
    let response;
    if (req.files) {
        const files = req.files
        const user = jwtService.getCookieData(req.cookies.user);
        if (user) {
            const dbFiles = await fileService.saveAll(files as Express.Multer.File[]);
            await postService.savePosts(dbFiles, user)
        }
    }
    res.status(200).json(response)
})

router.get('/post/:postName', async (req: Request, res: Response) => {
    let pathTo;
    if (req.params) {
        pathTo = path.join(__dirname, '../../../', 'uploads', req.params.postName);
        res.sendFile(pathTo);
    } else {
        res.status(200).json({})
    }

    return;
})

export default router;