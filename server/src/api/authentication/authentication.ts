import { Router, Request, Response } from 'express';
import { authenticationService, fileService, cookieService } from '../../services';
import { upload } from '../../app/middleware/uploadMiddleware';
const authRouter = Router();

authRouter.post('/signUp', upload.array("files"), async (req: Request, res: Response) => {
    let response;
    if (req.files) {
        const files = req.files
        const dbFiles = await fileService.saveAll(files as Express.Multer.File[]);
        if (req.body) {
            response = await authenticationService.register(req.body, dbFiles[0]);
        }
    }
    res.status(response?.status || 400).json(response)
})
authRouter.post('/login', async (req: Request, res: Response) => {

    if (req.body) {
        const { servicesRes, token, isAuthenticate } = await authenticationService.authenticate(req.body.email, req.body.password);
        cookieService.setCookie(res, token, 'user');
        res.status(servicesRes?.status).json({ servicesRes, isAuthenticate })
        return;
    }

    res.status(200).json({})
})
authRouter.post('/logout', async (req: Request, res: Response) => {
    if (req.cookies) {
        cookieService.removeCookie(res, 'user');
    }
    res.status(200).json({});
})
authRouter.get('/refresh', async (req: Request, res: Response) => {
    if (req.cookies.user) {
        const { servicesRes, isAuthenticate, token } = await authenticationService.refresh(req.cookies.user);
        if (isAuthenticate) {
            cookieService.setCookie(res, token, 'user');
            res.status(200).json({ servicesRes, isAuthenticate });
        }
        return;
    }
    res.status(200).json({});
})


export default authRouter;