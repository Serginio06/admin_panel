import {IRequest} from "../../types";
import {Response} from "express";
import {IConfig} from "../../../../types/config";

const config: IConfig = require("../../../../../config/index");

const handler = function (req: IRequest, res: Response): void {
    res.render("./signin.ejs", {facebookAppId: config.facebookAppId});
};

module.exports = {
    signin: handler,
    signup: handler,
    recover: handler,
    "signin/signup": handler,
    "signin/recover": handler,
};
