import {IRequest} from "../types";
import {Response} from "express";

export function apiTokenRequiresMiddleware(req: IRequest, res: Response, next: Function): void {
    next();
}
