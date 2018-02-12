import {HashUtil} from "./HashUtil";
import {EmailUtil} from "./EmailUtil";
import {LoggerUtil} from "./LoggerUtil";
import {RequestIdentifierUtil} from "./RequestIdentifierUtil";
import {WsUtil} from "./WsUtil";

export class ServiceLocator {
    private static instance;

    private _emailUtil: EmailUtil;
    private _hashUtil: HashUtil;
    private _loggerUtil: LoggerUtil;
    private _requestIdentifierUtil: RequestIdentifierUtil;
    private _wsUtil: WsUtil;

    private _domain: string;
    private _port: number;
    private _serverId: string;

    public static getInstance(): ServiceLocator {
        if (!this.instance) {
            this.instance = new ServiceLocator();
        }

        return this.instance;
    }


    public getRequestIdentifierUtil(): RequestIdentifierUtil {
        if (!this._requestIdentifierUtil) {
            this._requestIdentifierUtil = new RequestIdentifierUtil();
        }

        return this._requestIdentifierUtil;
    }

    public getLoggerUtil(): LoggerUtil {
        if (!this._loggerUtil) {
            this._loggerUtil = new LoggerUtil();
        }

        return this._loggerUtil;
    }

    public getEmailUtil(): EmailUtil {
        if (!this._emailUtil) {
            this._emailUtil = new EmailUtil();
        }

        return this._emailUtil;
    }

    public getHashUtil(): HashUtil {
        if (!this._hashUtil) {
            this._hashUtil = new HashUtil();
        }

        return this._hashUtil;
    }

    public getWsUtil(): WsUtil {
        if (!this._wsUtil) {
            this._wsUtil = new WsUtil();
        }

        return this._wsUtil;
    }

    public getServerId(): string {
        if (!this._serverId) {
            this._serverId = HashUtil.getRandomHash();
        }

        return this._serverId;
    }

    public setDomain(domain: string): ServiceLocator {
        this._domain = domain;
        return this;
    }

    public getDomain(): string {
        return this._domain;
    }

    public setPort(port: number): ServiceLocator {
        this._port = port;
        return this;
    }

    public getPort(): number {
        return this._port;
    }
}
