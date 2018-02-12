import * as React from "react";

interface ILabelProps {
    title: string;
    text: string;
    picSrc?: string | object;
}

type IPicture = JSX.Element | object;

export class Label extends React.Component<ILabelProps> {

    public render(): JSX.Element {
        const {
            title,
            text,
            picSrc,
        } = this.props;

        const pic: IPicture = picSrc ? (typeof picSrc === "string" ? <img src={picSrc}/> : picSrc) : null;

        return (
            <div className="Label">
                <div className="label-title">
                    {title}
                </div>

                <div className="label__content__wrapper">
                    {pic}
                    <div className="label-text">
                        <span>{text}</span>
                    </div>
                </div>
            </div>
        );
    }
}
