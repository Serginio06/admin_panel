import * as React from "react";
import {HelpBlock, OverlayTrigger, Tooltip} from "react-bootstrap";
import {DropdownField} from "./DropdownField";

export interface IDropDownProps {
    isEnabled?: boolean;
    tooltipPresent?: boolean;
    isCreatable?: boolean;

    value: string;
    label: string;
    type?: string;
    validationLevel?: string;
    validationMessage?: string;
    placeholder: string;
    tooltipText: string;
    dropdownClass: string;
    isStar?: boolean;

    valuesArray: any[];

    onChange: (codeType: string) => void;
    onFocus?: (event: FocusEvent) => void;
}

export class Dropdown extends React.Component<IDropDownProps> {

    public render(): JSX.Element {
        const {
            label,
            placeholder,
            tooltipPresent,
            tooltipText,
            validationLevel,  // has-error either has-warning or "" for normal
            validationMessage,
            valuesArray,
            value,
            onChange,
            onFocus,
            dropdownClass,
            isCreatable,
            isEnabled,
            isStar,
        } = this.props;

        const tooltip: JSX.Element = (
            <Tooltip id="tooltip"><strong>{tooltipText}</strong></Tooltip>
        );

        const overlayTrigger: JSX.Element = tooltipPresent ? (
            <OverlayTrigger
                placement="top"
                overlay={tooltip}
            >
                <div className="questionMark">?</div>
            </OverlayTrigger>
        ) : null;

        const helpBlock: JSX.Element = validationLevel ? (
            <HelpBlock className={"warning-text"}>{validationMessage}</HelpBlock>
        ) : null;

        const starEl: JSX.Element = isStar ? <span>*</span> : <span/>;

        return (
            <div className={`input__wrapper ${dropdownClass} ${validationLevel}`}>
                <div className="input_label_and_questionMark__wrapper">
                    <label htmlFor="" className="inputLabel">{starEl}{label}</label>
                    {overlayTrigger}
                </div>

                <DropdownField
                    isCreatable={isCreatable}
                    options={valuesArray}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    disabled={!isEnabled}
                />
                {helpBlock}
            </div>
        );
    }
}
