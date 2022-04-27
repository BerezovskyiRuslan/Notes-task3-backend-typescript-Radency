import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../Helper/ErrorHandler";
import { TokenService } from "../../Services/Token/Token";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {

        const authorizationHeader = req.headers.authorization;

        if(!authorizationHeader) {

            return res.status(401).json({error: "Unauthorized"});
        
        }

        const accessToken = authorizationHeader?.split(' ')[1] as string;
        
        if(!accessToken){
            
            return res.status(401).json({error: "Unauthorized"});
        
        }

        const userData = await new TokenService().validateAccessToken(accessToken);

        if(!userData) {

            return res.status(401).json({error: "Unauthorized"});

        }

        next()
        
    } catch (e) {
        errorHandler(res, e)
    }
}