import * as log4js from "log4js";
import {Configuration, Logger} from "log4js";

export class LoggerUtil {
    static _root: string = "";
    static _rootLength: number = 0;

    public static configure(config: Configuration): void {
        log4js.configure(config);
    }

    public static setRoot(value: string): void {
        LoggerUtil._root = value;
        LoggerUtil._rootLength = LoggerUtil._root.length;
    }

    public static getLoggerForFile(filepath: string): Logger {
        const index: number = filepath.lastIndexOf(".");

        if (index > -1) {
            filepath = filepath.substr(0, index);
        }
        if (LoggerUtil._rootLength) {
            filepath = filepath.substr(LoggerUtil._rootLength);
        }
        if (filepath.length > 32) {
            filepath = filepath.substr(-32);
        }

        return log4js.getLogger(filepath);
    }

    public static stringify(obj: any): string {
        return JSON.stringify(LoggerUtil._normalizeJSON(obj), null, "\t");
    }

    public static stringifyArray(obj: any[]): string {
        let arr: any[] = [];

        try {
            arr = JSON.parse(JSON.stringify(obj));

            for (let item of arr) {
                item = LoggerUtil._stringifyObj(item);
            }
        } catch (err) {
            // do nothing
        }

        return LoggerUtil.stringify(arr);
    }

    public static stringifyObj(obj: any): string {
        if (!obj) {
            return "";
        }

        let _obj: any = JSON.parse(JSON.stringify(obj));

        _obj = LoggerUtil._stringifyObj(_obj);

        return LoggerUtil.stringify(_obj);
    }

    static _stringifyObj(obj: any): string {
        for (const key in obj) {
            if (typeof obj[key] === "string") {
                obj[key] = LoggerUtil._stringifyStr(obj, key);
            } else if (typeof obj[key] === "object" && obj[key] && obj[key].length) {
                if (typeof obj[key][0] === "string") {
                    obj[key] = LoggerUtil._stringifyArrayStr(obj[key]);
                }
            }
        }

        return obj;
    }

    static _stringifyArrayStr(arr: any[]): any[] {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] && arr[i].length && arr[i].length > 100) {
                arr[i] = "Too long value";
            }
        }

        return arr;
    }

    static _stringifyStr(obj: any, key: string): void {
        if (obj[key] && obj[key].length && obj[key].length > 1000) {
            obj[key] = "Too long value";
        }
    }

    static _normalizeJSON(object: any) {
        let i: number;
        let k: string;
        let ret: any;

        if (!(object instanceof Object)) {
            if (typeof object === "string" && object.length > 500) {
                ret = object.substr(0, 500);
            } else {
                ret = object;
            }
        } else if (object['toJSON']) {
            ret = object['toJSON']();
        } else if (object instanceof Array || object['toArray']) {
            if (object['toArray']) {
                object = object['toArray']();
            }
            ret = [];
            for (i = 0; i < object.length; i++) {
                ret.push(LoggerUtil._normalizeJSON((object[i])));
            }
        } else {
            ret = {};
            for (k in object) {
                ret[k] = LoggerUtil._normalizeJSON(object[k]);
            }
        }

        return ret;
    }
}
