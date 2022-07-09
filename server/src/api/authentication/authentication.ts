import { Router, Request, Response } from 'express';
import { ApiResponse } from '../../model';
import { authenticationService } from '../../services';

const router = Router();

router.post('/api/signUp', async (req: Request, res: Response) => {
    let response;
    if (req.body) {
        response = await authenticationService.register(req.body);
    }
    res.status(response?.status || 400).json(response)
})
router.post('/api/login', async (req: Request, res: Response) => {

    if (req.body) {
        const { servicesRes, token, isAuthenticate } = await authenticationService.authenticate(req.body.email, req.body.password);
        res.cookie('user', token, {
            expires: new Date(Date.now() + 315360000000),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
        res.status(servicesRes?.status).json({ servicesRes, isAuthenticate })
    } else {
        res.status(400).json({})
    }
})
router.post('/api/logout', async (req: Request, res: Response) => {
    if (req.cookies) {
        res.cookie('user', '', {
            expires: new Date(Date.now() + 315360000000),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
    }
    res.status(200).json({});
})
router.get('/api/refresh', async (req: Request, res: Response) => {
    if (req.cookies.user) {
        console.log(req.cookies.user);
    }
    res.status(200).json({});
})


export default router;