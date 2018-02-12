import {IConfig} from "../../../../types/config";
import {WsMessageType} from "../../../../types/constants/WsMessageType";
import {updateStatisticsAction} from "../../main/actions";

let _socket: WebSocket;
let _timer: any;

export const initializeSocket = (dispatch: any): void => {
    const config: IConfig = require("../../../../../config");
    _socket = new WebSocket(`ws://${config.domain}:${config.wsPort}`);

    _socket.onopen = (): void => {
        _ping();
    };

    _socket.onmessage = (message: MessageEvent): void => {
        switch (message.type) {
            case WsMessageType.PONG:
                _ping();
                break;

            case WsMessageType.UPDATE_STATISTICS:
                dispatch(updateStatisticsAction(message.data));
                break;
        }
    }
};

export const chooseCompany = (companyId: string): void => {
    if (_socket) {
        _socket.send({
            type: WsMessageType.CHOOSE_COMPANY,
            data: companyId,
        })
    }
};

export const closeSocket = (): void => {
    if (_socket) {
        _socket.close();
    }
};

const _ping = (): void => {
    if (_timer) {
        clearTimeout(_timer);
    }

    _timer = setTimeout((): void => {
        _socket.send({type: WsMessageType.PING});
    }, 30000);
};
