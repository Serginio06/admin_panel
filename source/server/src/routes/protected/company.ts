import {LoggerUtil} from "../../util/LoggerUtil";
import {CompanyController} from "../../controllers/CompanyController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {
    ICheckCompanyEmailBody,
    ICheckCompanyPhoneBody,
    ICheckCompanyWebAddressBody, IDeleteCompanyBody,
    IEditCompanyBody,
    IRegisterCompanyBody,
} from "../../types/body";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: CompanyController = new CompanyController();

module.exports = {
    deleteCompany(req: IRequest, res: Response, next: () => void): void {
        logger.info(`[${req.identifier}][deleteCompany] Attempt to delete new company.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IDeleteCompanyBody = req.body;
        const userId: string = (req as any).session.userId;

        controller.deleteCompany(userId, body.companyId, req.identifier)
            .then((): void => {
                    res.json({
                        success: true,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][deleteCompany] Attempt to delete company failed!
                    \n${err}`);

                if (!res.headersSent) {
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
                }
            })
            .then((): void => {
                next();
            });
    },

    registerCompany(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][registerCompany] Attempt to register new company.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRegisterCompanyBody = req.body;
        const userId: string = (req as any).session.userId;

        controller.registerCompany(userId, body.company, req.identifier)
            .then((company: any): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: company,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][registerCompany] Attempt to register new company failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    editCompany(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][editCompany] Attempt to edit company.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IEditCompanyBody = req.body;
        const userId: string = (req as any).session.userId;

        controller.editCompany(body.company, userId, req.identifier)
            .then((company: any): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: company,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][editCompany] Attempt to edit company failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    checkCompanyEmail(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][checkCompanyEmail] Attempt to check company email.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ICheckCompanyEmailBody = req.body;

        controller.checkEmail(body.email, req.identifier)
            .then((checkingResult: boolean): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: checkingResult,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][checkCompanyEmail] Attempt to check company email failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    checkPhone(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][checkPhone] Attempt to check company phone.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ICheckCompanyPhoneBody = req.body;

        controller.checkPhone(body.phone, req.identifier)
            .then((checkingResult: boolean): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: checkingResult,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][checkPhone] Attempt to check company phone failed!
                    \n${err}`);
                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    checkWebAddress(req: IRequest, res: Response, next: Function) {
        logger.info(`[${req.identifier}][checkWebAddress] Attempt to check company web address.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ICheckCompanyWebAddressBody = req.body;

        controller.checkWebAddress(body.webAddress, req.identifier)
            .then((checkingResult: boolean): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: checkingResult,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][checkWebAddress] Attempt to check company web address failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    loadUserCompanies(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][loadUserCompanies] Attempt to load user companies.`);

        const userId: string = (req as any).session.userId;

        controller.loadUserCompanies(userId, req.identifier)
            .then((userCompanies: any[]): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: userCompanies,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][loadUserCompanies] Attempt to load user companies failed!
                    \n${err}`);
                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },
};
