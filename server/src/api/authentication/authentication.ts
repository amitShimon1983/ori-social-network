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
    let response: ApiResponse;
    if (req.body) {
        response = await authenticationService.authenticate(req.body.email, req.body.password);
        res.cookie('user', { user: JSON.stringify(response.payload) }, {
            expires: new Date(Date.now() + 315360000000),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
        res.status(response?.status).json(response)
    } else {
        res.status(400).json({})
    }
})
router.post('/api/logout', async (req: Request, res: Response) => {
    if (req.cookies) {
        res.cookie('user', { user: '' }, {
            expires: new Date(Date.now() + 315360000000),
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });
    }
    res.status(200);
})
router.get('/api/refresh', async (req: Request, res: Response) => {
    if (req.cookies.user) {
       console.log(req.cookies.user);   
    }
    res.status(200);
})


export default router;