import * as React from "react";
import {HelpBlock, OverlayTrigger, Tooltip} from "react-bootstrap";

interface ITextareaState {
    value: string;
    showValidationError: boolean;
}

interface ITextareaProps {
    textAreaClass: string,
    placeholder: string,
    value: string,
    label: string,
    validationLevel: string,
    validationMessage: string,
    tooltipText: string,

    textAreaHeight: string,
    maxLength?: number,

    onChange: (value: string) => void;
    isStar?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export class Textarea extends React.Component<ITextareaProps, ITextareaState> {
    private timer: any;

    public static defaultProps: Partial<ITextareaProps> = {
        placeholder: "Type",
    };

    constructor(props: ITextareaProps) {
        super(props);
        this.state = {
            value: "",
            showValidationError: false,
        };
    }

    public componentWillReceiveProps(nextProps: ITextareaProps): void {
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
            label,
            tooltipText,
            validationLevel, // has-error either has-warning or "" for normal
            validationMessage,
            value,
            textAreaClass,
            textAreaHeight,
            maxLength,
            placeholder,
            isStar,
        } = this.props;
        const { showValidationError } = this.state;

        const tooltip: JSX.Element = this.getTooltip(tooltipText),
            overlayTrigger: JSX.Element = this.getOverlay(tooltipText, tooltip),
            lengthBlock: JSX.Element = this.getLengthBlock(value, maxLength),
            helpBlock: JSX.Element = showValidationError && this.getHelpBlock(validationLevel, validationMessage);
        const starEl: JSX.Element = isStar ? <span>*</span> : null;

        let validation = "";
        if (showValidationError) {
            validation = validationLevel;
        }
        return (
            <div className={"textArea__wrapper " + textAreaClass + " " + validation}
                 id="companyReg__textAreaDescription">
                <div className="input_label_and_questionMark__wrapper">
                    <label htmlFor="" className="inputLabel">
                        {starEl}{label}
                    </label>

                    {overlayTrigger}
                </div>

                <textarea
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    className={"textArea form-control"}
                    placeholder={placeholder}
                    value={value}
                    style={{height: textAreaHeight}}/>

                <div className="subInput__info-wrapper">
                    {helpBlock}
                    {lengthBlock}
                </div>
            </div>
        );
    }

    private showErrorCB = () => {
        this.setState({
            showValidationError: true,
        });
        clearTimeout(this.timer);
    };

    private getHelpBlock = (validationLevel, validationMessage): JSX.Element => {
        return validationLevel ? (
            <HelpBlock className={"warning-text"}>{validationMessage}</HelpBlock>
        ) : null;
    };
    private getLengthBlock = (value, maxLength): JSX.Element => {
        return maxLength ?
            (<span className="span_maxLength">
                {value ? value.length : 0}/{maxLength}
            </span>)
            :
            (<span className="span_maxLength">&nbsp;</span>);
    };
    private getOverlay = (tooltipText, tooltip): JSX.Element => {
        return tooltipText && tooltipText.length ?
            (<OverlayTrigger
                placement="top"
                overlay={tooltip}>
                <div className="questionMark">?</div>
            </OverlayTrigger>) : null;
    };

    private getTooltip = (tooltipText): JSX.Element => {
        return (
            <Tooltip id="tooltip"><strong>{tooltipText}</strong></Tooltip>
        );
    };

    private onChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        const value: string = (e.target as HTMLTextAreaElement).value;

        this.setState({
            value,
            showValidationError: false,
        });

        clearTimeout(this.timer);

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    private onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(e);
        }
    };

    private onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
        clearTimeout(this.timer);
        if (this.props.validationLevel) {
            this.showErrorCB();
        }
    };

    private onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };
}
