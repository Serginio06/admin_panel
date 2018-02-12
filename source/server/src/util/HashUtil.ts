import * as md5 from "md5";

const _salt: string = "asf33467sf";

export class HashUtil {
    public static encryptPassword(password: string): string {
        return md5(_salt + password);
    }

    public static getRandomHash(): string {
        return md5(Math.pow(Math.random(), Math.random() * (100 - 1) + 1).toString());
    }

    public static getRandomHashByValue(value: string): string {
        return md5(Math.pow(Math.random(), Math.random() * (100 - 1) + 1).toString() + value);
    }
}