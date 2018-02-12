import {IConfig} from "../../../../types/config";
import {IRequest} from "../../types";
import {Response} from "express";

const config: IConfig = require("../../../../../config/index");

const handler = function (req: IRequest, res: Response): void {
    res.render("./main.ejs", {googleApiKey: config.googleApiKey});
};

module.exports = {
    "/": handler,
    companies: handler,
    projects: handler,
    promos: handler,
    welcome: handler,
    password: handler,
    statistics: handler,
};
