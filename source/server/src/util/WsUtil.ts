import {LoggerUtil} from "./LoggerUtil";
import {WsMessageType} from "../../../types/constants/WsMessageType";
import {Logger} from "log4js";
import {IPromoStatistics} from "../../../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class WsUtil {
    private _wss: any;
    private _promoId2socketMap: any;
    private _socket2PromoIdsMap: any;

    constructor() {
        // const config: IConfig = require("../../../../config");

        // this._wss = new WebSocket.Server({port: config.wsPort});
        this._promoId2socketMap = {};
        this._socket2PromoIdsMap = {};

        this._wss.on("connection", (socket: WebSocket): void => {
            // socket.on("message", (message: IWsMessage): void => {
            //     switch (message.type) {
            //         case WsMessageType.INIT_PROMO_IDS:
            //             const promoIds: string[] = message.data;
            //             this._socket2PromoIdsMap[socket.toString()] = promoIds;
            //             for (const id of promoIds) {
            //                 this._promoId2socketMap[id] = socket;
            //             }
            //             break;
            //
            //         case WsMessageType.CHOOSE_COMPANY:
            //
            //             break;
            //
            //         case WsMessageType.PING:
            //             socket.send({type: WsMessageType.PONG});
            //             break;
            //     }
            // });

            // socket.on("close", (socket: WebSocket): void => {
            //     const promoIds: string[] = this._socket2PromoIdsMap[socket.toString()];
            //
            //     if (promoIds) {
            //         for (const id of promoIds) {
            //             delete this._promoId2socketMap[id];
            //         }
            //     }
            //
            //     delete this._socket2PromoIdsMap[socket.toString()];
            // })
            //
            //     delete this._socket2PromoIdsMap[socket.toString()];
            // });
            // socket.on("error", console.error);

        });
    }

    public sendStatistics(statistics: IPromoStatistics, reqIdentifier: string): void {
        logger.info(`[${reqIdentifier}][sendStatistics] attempt to send promo statistics to client
            \nstatistics: ${LoggerUtil.stringify(statistics)}`);

        for (const key in this._promoId2socketMap) {
            if (key === statistics.promoId) {
                this._promoId2socketMap[key].send({
                    type: WsMessageType.UPDATE_STATISTICS,
                    data: statistics,
                });
                break;
            }
        }
    }
}
