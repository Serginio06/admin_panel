import * as md5 from "md5";

export class RequestIdentifierUtil {
    private _pool: Object = {};

    public getUniqueIdentifier(): string {
        let identifier: string;
        let counter: number = 10;

        do {
            identifier = md5(Math.random().toString());

            if (this._pool.hasOwnProperty(identifier)) {
                counter--;
            }
        } while (this._pool.hasOwnProperty(identifier) && counter > 0);

        if (this._pool.hasOwnProperty(identifier)) {
            throw new Error("Can't create unique request id!");
        }

        this._pool[identifier] = {};

        return identifier;
    }

    public release(identifier: string): void {
        if (this._pool.hasOwnProperty(identifier)) {
            delete this._pool[identifier];
        }
    }
}