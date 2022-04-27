import express from 'express';
import { errorHandler } from '../../Helper/ErrorHandler';
import { AuthService } from "../../Services/Auth/Auth";
import { HttpCode } from '../../Types/Enum/HttpCode';

class AuthController {
    public async register(req: express.Request, res:express.Response) {
        try {
            
            let candidate = await new AuthService().registration(req.body);

            res.cookie('refreshToken', candidate.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})


            res.status(HttpCode.CREATED).json({...candidate.user, accessToken: candidate.accessToken});

        } catch (e) {
            errorHandler(res, e)
        }
    }

    public async login(req: express.Request, res:express.Response) {
        try {
            const user = await new AuthService().login(req.body);

            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})


            res.status(HttpCode.OK).json({...user.user, accessToken: user.accessToken});
        } catch (e) {
            errorHandler(res, e)
        }
    }

    public async logout(req: express.Request, res:express.Response) {
        try {
            const token = await new AuthService().logout(req.cookies.refreshToken);

            res.clearCookie('refreshToken');
            res.status(HttpCode.OK).json(token);
        } catch (e) {
            errorHandler(res, e)
        }
    }

    public async refresh(req: express.Request, res:express.Response) {

        try {
            const token = await new AuthService().refresh(req.cookies.refreshToken);

            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            res.status(HttpCode.OK).json({...token.user, accessToken: token.accessToken});

        } catch (e) {
            errorHandler(res, e)
        }

    }
}

export { AuthController }