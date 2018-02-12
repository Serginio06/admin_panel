import * as moment from "moment";
import {Moment} from "moment";
import * as React from "react";
import {HelpBlock, OverlayTrigger, Tooltip} from "react-bootstrap";
import DatePicker from "react-datepicker";

export interface IDataPickerInputProps {
    isDisabled: boolean;
    tooltipPresent?: boolean;

    showTimeSelect?: boolean;

    className?: string;
    dateFormat?: string;
    timeFormat?: string;

    value: string;
    label: string;
    validationLevel?: string;
    validationMessage?: string;
    valueStartDateTime?: string;
    placeholder?: string;
    inputClass: string;
    tooltipText: string;

    timeIntervals: number;

    onChange: (date: string) => void;
    onFocus?: (event: FocusEvent) => void;
    isStar?: boolean;
}

export class DatePickerInput extends React.Component<IDataPickerInputProps> {

    private dateFormat: string;
    private timeFormat: string;
    private format: string;

    constructor(props: IDataPickerInputProps) {
        super(props);

        this.dateFormat = "MMM DD, YYYY";
        this.timeFormat = "hh:mm a";

        this.format = this.dateFormat + " " + this.timeFormat;
    }

    public render() {
        const {label, validationLevel, inputClass, validationMessage, isDisabled, value, valueStartDateTime, isStar} = this.props;

        const tooltip: JSX.Element = this.getTooltip(this.props.tooltipText),
            overlayTrigger: JSX.Element = this.getOverlay(this.props.tooltipPresent, tooltip),
            helpBlock: JSX.Element = this.getHelpBlock(validationLevel, validationMessage);
        let val: Moment;
        let valueStr: string;

        if (valueStartDateTime || valueStartDateTime === null) {
            const finishValue: Moment = value ? moment(value, this.format) : moment().add(1, "d");
            const startValue: Moment = moment(valueStartDateTime, this.format);
            const difference: number = finishValue.diff(startValue, "days");

            if (difference < 1) {
                val = moment(valueStartDateTime, this.format).add(1, "d");
            } else {
                val = finishValue;
            }
        } else {
            val = value ? moment(value, this.format) : moment();
        }

        valueStr = moment(val).format(this.format);
        const starEl = isStar ? <span>*</span> : <span/>;

        return (
            <div className={`input__wrapper ${inputClass} ${validationLevel}`}>
                <div className="input_label_and_questionMark__wrapper">

                    <label className="inputLabel">
                        {starEl}{label}
                    </label>

                    {overlayTrigger}
                </div>

                <DatePicker
                    showTimeSelect
                    disabled={isDisabled}
                    dateFormat={this.dateFormat}
                    timeFormat={this.timeFormat}
                    className={"mydataPicker"}
                    width="100%"
                    value={valueStr}
                    selected={val}
                    timeIntervals={this.props.timeIntervals}
                    placeholderText={this.props.placeholder}
                    onFocus={this.onFocus}
                    onChange={this.onChange}
                />

                <div className="subInput__info-wrapper">
                    {helpBlock}
                </div>
            </div>
        );
    }

    private getTooltip = (tooltipText: string): JSX.Element => {
        return (
            <Tooltip id="tooltip">
                <strong>
                    {tooltipText}
                </strong>
            </Tooltip>
        );
    };
    private getOverlay = (tooltipPresent: boolean, tooltipText: JSX.Element): JSX.Element => {
        return tooltipPresent ?
            (
                <OverlayTrigger
                    placement="top"
                    overlay={tooltipText}
                >
                    <div className="questionMark">?</div>
                </OverlayTrigger>
            ) : null;
    };
    private getHelpBlock = (validationLevel: string, validationMessage: string): JSX.Element => {
        return validationLevel ?
            (
                <HelpBlock className={"warning-text"}>
                    {validationMessage}
                </HelpBlock>
            ) : null;
    };
    private onChange = (date: Moment): void => {

        if (date === null || date <= moment()) {
            this.props.onChange(moment().format(this.format));
        } else {
            this.props.onChange(date.format(this.format));
        }
    };
    private onFocus = (e: FocusEvent): void => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }
}
