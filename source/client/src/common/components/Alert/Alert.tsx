import * as block from "bem-cn";
import * as classnames from "classnames";
import * as React from "react";
import "./Alert.scss";

const b = block("Alert");

export interface IAlertProps {
    text: string;
    type?: string;
}

export class Alert extends React.Component<IAlertProps> {

    constructor(props: IAlertProps) {
        super(props);
    }

    public render() {
        const text: string = this.props.text;
        const type: string = this.props.type;

        return (
            <div className={classnames(b(), b({type})())}>
                <div className={classnames(b("left-side")())}/>
                <div className={classnames(b("container", {type})())}>{text}</div>
            </div>
        );
    }
}
