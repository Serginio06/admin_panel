import {ServerErrorCode} from "../constants/ServerErrorCode";
import {IRequest} from "../types";
import {Response} from "express";

export function tokenRequiresMiddleware(req: IRequest, res: Response, next: Function): void {
    if (!req.session || !req.session.id || !req.session.userId) {
        req.session.destroy(() => {});


        if (req.method === "GET") {
            res.redirect("/signin");
        } else {
            res.json({
                success: false,
                errorCode: ServerErrorCode.AUTH_ERROR,
            });
        }

        return;
    }

    next();
}

export function tokenAbsentMiddleware(req: IRequest, res: Response, next: Function): void {
    if (req.session && req.session.id && req.session.userId) {
        if (req.method === "GET" && req.originalUrl.indexOf("/signin") !== -1) {
            res.redirect("/");
        } else {
            res.json({
                success: false,
                errorCode: ServerErrorCode.AUTH_ERROR,
            });
        }

        return;
    }

    next();
}
