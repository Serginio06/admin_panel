import * as React from "react";
import {FormControl, HelpBlock, OverlayTrigger, Tooltip} from "react-bootstrap";
import dataSet from "../util/dataSet";
import {Alignment} from "../constants/alignment";
import * as classNames from "classnames";

export interface IInputProps {
    isDisabled?: boolean;
    tooltipPresent?: boolean;
    buttonDisabled?: boolean;
    isEnabled?: boolean;

    id?: string | number;
    buttonId?: string | number;

    value: string | number;

    type?: string;
    placeholder?: string;
    buttonText?: string;
    inputClass: string;
    label?: string;
    validationLevel?: string;
    validationMessage?: string;
    tooltipText?: string;
    maxLength?: string;
    isStar?: boolean;

    caret?: string;
    caretAlignment?: Alignment

    onChange?: (value: string | number, buttonId: string | number) => void;
    onFocus?: (e: React.FocusEvent<FormControl>) => void;
    onBlur?: (e: React.FocusEvent<FormControl>) => void;
    onKeyDown?: (e: React.KeyboardEvent<FormControl>) => void;
    onButtonClick?: (id: string) => void;
}

export interface IInputState {
    value: string | number;
    showValidationError: boolean;
}

export class Input extends React.Component<IInputProps, IInputState> {
    private timer: any;

    public static defaultProps: Partial<IInputProps> = {
        placeholder: "Type",
        type: "text",
        value: "",
    };

    private input: FormControl = null;

    constructor(props: IInputProps) {
        super(props);

        this.state = {
            value: "",
            showValidationError: false,
        };
    }

    public componentWillReceiveProps(nextProps: IInputProps): void {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value,
            });
            if (nextProps.validationLevel) {
                this.timer = setTimeout(this.showErrorCB, 2000);
            }
        }
    }

    public render(): JSX.Element {
        const {
            placeholder,
            type,
            label,
            validationLevel,
            caret,
            caretAlignment,
            isDisabled,
            inputClass,
            tooltipPresent,
            buttonText,
            buttonDisabled,
            isStar,
            value,
        } = this.props;

        const {showValidationError} = this.state;
        const id: string = this.props.id ? this.props.id.toString() : Math.random().toString();
        const buttonId: string = this.props.buttonId ? this.props.buttonId.toString() : Math.random().toString();
        const tooltip = this.getTooltip(this.props.tooltipText);
        const overlayTrigger = this.getOverlay(tooltipPresent, tooltip);
        const lengthBlock = this.getLengthBlock(this.props.maxLength, this.state.value ? this.state.value.toString() : "");
        const helpBlock = showValidationError && this.getHelpBlock(validationLevel, this.props.validationMessage);
        const starEl: JSX.Element = isStar ? <span>*</span> : <span/>;
        const _value: string = value ? value.toString() : "";

        return (
            <div {...dataSet(this.props)}
                 className={`input__wrapper ${inputClass} ${showValidationError && validationLevel || ""}`}>
                <div id={null} className="input_label_and_questionMark__wrapper">
                    <label className="inputLabel">{starEl}{label}</label>
                    {overlayTrigger}
                </div>
                <div className={classNames("input__fc-wrapper", {
                    hasCaret: !!caret,
                    leftCaret: caretAlignment === Alignment.LEFT,
                })}
                >
                    <FormControl
                        {...dataSet(this.props)}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        type={type}
                        className={"formInput"}
                        placeholder={placeholder}
                        value={_value}
                        id={id}
                        disabled={isDisabled}
                        ref={(input: FormControl) => {
                            this.input = input;
                        }}
                        style={{
                            paddingLeft: caretAlignment === Alignment.LEFT && !!parseFloat(value.toString()) ? null : 10,
                        }}
                    />
                    {caret &&
                    <span id={null} className="Caret" style={{
                        display: !!parseFloat(_value.toString()) ? "inline" : "none",
                        left: caretAlignment === Alignment.LEFT ? 10 : `calc(${_value.toString().length}ex + 15px)`,
                    }}>{caret}</span>}
                    {
                        buttonText &&
                        <button
                            id={buttonId}
                            className="input-right-action"
                            disabled={buttonDisabled}
                            onClick={this.onButtonClick}
                        >
                            {buttonText}
                        </button>}
                </div>
                {
                    (helpBlock || lengthBlock) &&
                    <div className="subInput__info-wrapper">
                        {helpBlock}
                        {lengthBlock}
                    </div>
                }
            </div>
        );
    }

    private showErrorCB = (): void => {
        this.setState({
            showValidationError: true,
        });
        clearTimeout(this.timer);
    };

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

    private getLengthBlock = (maxLength: string, value: string): JSX.Element => {
        return maxLength ?
            (
                <span className="span_maxLength">
                    {value ? value.length : 0}/{maxLength}
                </span>
            )
            : null;
    };

    private getHelpBlock = (validationLevel: string, validationMessage: string): JSX.Element => {
        return validationLevel ?
            (
                <HelpBlock className={"warning-text"}>
                    {validationMessage}
                </HelpBlock>
            ) : null;
    };

    private onFocus = (e: React.FocusEvent<FormControl>): void => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    private onChange = (e: React.FormEvent<FormControl>): void => {
        const value: string = (e.target as HTMLInputElement).value;

        this.setState({
            value,
            showValidationError: false,
        });

        clearTimeout(this.timer);

        if (this.props.onChange) {
            this.props.onChange(value, this.props.buttonId);
        }
    };

    private onBlur = (e: React.FocusEvent<FormControl>): void => {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
        clearTimeout(this.timer);
        if (this.props.validationLevel) {
            this.showErrorCB();
        }
    };

    private onKeyDown = (e: React.KeyboardEvent<FormControl>): void => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    };

    private onButtonClick = (e: React.FormEvent<HTMLButtonElement>): void => {
        if (this.props.onButtonClick) {
            this.props.onButtonClick((e.target as HTMLButtonElement).id);
        }
    }
}
