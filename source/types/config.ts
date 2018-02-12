import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import {SessionOptions} from "express-session";

export interface IConfig {
    facebookAppId: string;
    googleApiKey: string;
    domain: string;
    dbUrl: string;
    port: number;
    wsPort: number;
    jwtSecret: string;
    session: SessionOptions,

    mail: SMTPTransport.Options;
}