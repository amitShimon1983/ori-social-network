import { Router, Request, Response } from 'express';
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
    let response;
    if (req.body) {
        response = await authenticationService.authenticate(req.body.email, req.body.password);
    }
    res.status(response?.status || 400).json(response)
})


export default router;