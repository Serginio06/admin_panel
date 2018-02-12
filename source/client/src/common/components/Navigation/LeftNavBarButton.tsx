import * as React from "react";
import SVGInline from "react-svg-inline";
import {Color} from "../../constants/Color";
import "./LeftNavBarButton.scss";
import * as classNames from "classnames";

export interface ILeftNavBarButtonProps {
    active: boolean,
    disabled: boolean,
    alt?: string,
    activeIcon?: string,
    inactiveIcon?: string;
    icon?: SVGElement,
    width?: string,
    height?: string,
    badge?: string,
    onClick?: () => void;
}

export class LeftNavBarButton extends React.Component<ILeftNavBarButtonProps> {

    public static defaultProps: ILeftNavBarButtonProps = {
        active: false,
        disabled: false,
        height: "25px",
        width: "25px",
    };

    public shouldComponentUpdate(nextProps: ILeftNavBarButtonProps): boolean {
        return (nextProps.active !== this.props.active)
            || (nextProps.disabled !== this.props.disabled);
    }

    public render(): JSX.Element {
        const {disabled, active, icon, width, height, badge} = this.props;

        const badgeEl: JSX.Element = badge ? <div className="envelop-badge">{badge}</div> : null;

        const className = classNames(
            "LeftNavBarButton",
            "navPage__leftBar__category__img-wrapper",
            {disabled},
            {active});
        return (
            <div className={className} onClick={this.props.onClick}>
                <SVGInline
                    svg={icon}
                    fill={disabled ? Color.GREY : (active ? Color.BLUE : Color.WHITE)}
                    width={width}
                    height={height}

                />
                {badgeEl}
            </div>
        );
    }
}
