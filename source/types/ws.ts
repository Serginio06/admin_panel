import {WsMessageType} from "./constants/WsMessageType";

export interface IWsMessage {
    type: WsMessageType;
    data: any;
}