import {EmailTarget} from "../constants/EmailTarget";
import {LoggerUtil} from "./LoggerUtil";
import * as nodemailer from "nodemailer";
import * as ejs from "ejs";
import * as fsp from "fs-extra-promise";
import * as path from "path";
import {Logger} from "log4js";
import * as Mail from "nodemailer/lib/mailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class EmailUtil {
    private _transport: Mail;

    public configureEmail(config: SMTPTransport.Options) {
        this._transport = nodemailer.createTransport(config);
    }

    public sendEmail(receiver: string, type: EmailTarget, data: any, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][sendEmail] attempt to send email.
            \nreceiver: ${LoggerUtil.stringify(receiver)}
            \ntype: ${LoggerUtil.stringify(type)}
            \ndata: ${LoggerUtil.stringify(data)}`);

        // let templatePath: string = "";
        // let subject: string = "";
        //
        // switch (type) {
        //     case EmailTarget.VERIFY_USER_EMAIL:
        //         templatePath = path.join(__dirname, "../templates/EmailVerificationLetter.ejs");
        //         subject = "E-mail address verification";
        //         break;
        //
        //     case EmailTarget.RECOVER_PASSWORD:
        //         templatePath = path.join(__dirname, "../templates/RecoverPasswordLetter.ejs");
        //         subject = "Recover password";
        //         break;
        //
        //     default:
        //         logger.error(`[${reqIdentifier}][sendEmail] Unknown letter type! ${type}`);
        //         throw new Error("Unknown letter type!");
        // }
        //
        // return this._renderHtml(templatePath, data, reqIdentifier)
        //     .then((html: string): Promise<void> => this._send(receiver, subject, html, reqIdentifier));

        return Promise.resolve();
    }

    private _send(receiver: string, subject: string, html: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][_send] attempt to send email
            \nreceiver: ${LoggerUtil.stringify(receiver)}
            \nsubject: ${LoggerUtil.stringify(subject)}`);

        const mailOptions: Mail.Options = {
            from: "some.test.placeholder@gmail.com",
            to: receiver,
            subject,
            html,
        };

        return this._transport.sendMail(mailOptions)
            .then((): void => {
                logger.info(`[${reqIdentifier}][_send] email sent successfully`);
            })
            .catch((err: Error) => {
                logger.info(`[${reqIdentifier}][_send] email sending failed
                    \n${err}`);

                throw err;
            })
            .then((): void => {
                this._transport.close();
            });
    }

    //@todo fix `any`
    private _renderHtml(templatePath: string, templateData: any, reqIdentifier: string): any {
        logger.info(`[${reqIdentifier}][_renderHtml] attempt to render html template
            \ntemplatePath: ${LoggerUtil.stringify(templatePath)}
            \ntemplateData: ${LoggerUtil.stringify(templateData)}`);

        return fsp.readFileAsync(templatePath, "utf-8")
            .then((data: string): string => {
                logger.info(`[${reqIdentifier}][_renderHtml] template file was read successfully`);

                return ejs.render(data, templateData);
            });
    }
}
