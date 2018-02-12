import * as classnames from "classnames";
import * as React from "react";
import {Checkbox as BootstrapCheckbox, OverlayTrigger, Tooltip} from "react-bootstrap";
import "./Checkbox.scss";

interface ICheckboxProps {
    id?: string;
    isChecked?: boolean;
    disabled?: boolean;
    tooltipText?: string;
    checkboxClass?: string;
    small?: boolean;
    onChange?: (v) => void;
    onClick?: (v) => void;
    onFocus?: (v) => void;
    isStar?: boolean;
}

interface ICheckboxState {
    id?: string;
}

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
    constructor(props: ICheckboxProps) {
        super(props);
        this.state = {
            id: props.id ? props.id : Math.random().toString(),
        };
    }

    public componentWillReceiveProps(nextProps: ICheckboxProps): void {
        if (nextProps.id !== this.state.id) {
            this.setState({
                id: nextProps.id,
            });
        }
    }

    public render(): JSX.Element {
        const {
            tooltipText,
            onChange,
            isChecked,
            disabled,
            checkboxClass,
            small,
            onClick,
            isStar,
        } = this.props;

        const tooltip: JSX.Element = (
            <Tooltip id="tooltip"><strong>{tooltipText}</strong></Tooltip>
        );

        const overlayTrigger: JSX.Element = tooltipText && tooltipText.length ? (
            <OverlayTrigger placement="top" overlay={tooltip}>
                <div className="questionMark">{"?"}</div>
            </OverlayTrigger>
        ) : null;
        const starEl = isStar ? <span>*</span> : <span/>;

        return (
            <div className={classnames("Checkbox", "checkbox__wrapper", checkboxClass, {small})} onClick={onClick}>
                <div className="checkbox_label_and_questionMark__wrapper">
                    <label className="checkboxLabel">
                        {starEl}{this.props.children}
                    </label>
                    {overlayTrigger}
                </div>
                <BootstrapCheckbox
                    inline
                    id={this.state.id}
                    className={classnames({"regular-checkbox": !small})}
                    onChange={onChange}
                    checked={!!isChecked}
                    disabled={disabled}
                />
            </div>
        );
    }
}
