import * as React from "react";
import {HelpBlock, OverlayTrigger, Tooltip} from "react-bootstrap";
import Select from "react-select";
import {IDropdownListValue} from "../../main/state";
import {PromoTargetInterest} from "../../../../types/constants/PromoTargetInterest";

interface ITextareaAutocompleteProps {
    textAreaClass: string;
    value: any[];
    label: string;
    validationLevel: string;
    validationMessage: string;
    tooltipText: string;
    options: any[];
    placeholder?: string;
    tooltipPresent?: boolean;
    textAreaHeight?: string;

    onChange: (e: any[]) => void;
    onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    isStar?: boolean;
}

interface ITextareaAutocompleteState {
    value: string;
}

export class TextareaAutocomplete extends React.Component<ITextareaAutocompleteProps, ITextareaAutocompleteState> {

    constructor(props: ITextareaAutocompleteProps) {
        super(props);
        this.state = {
            value: "",
        };
    }

    public render(): JSX.Element {
        const {
            label,
            tooltipText,
            validationLevel,
            validationMessage,
            textAreaClass,
            placeholder,
            options,
            isStar,
        } = this.props;

        const tooltip = this.getTooltip(tooltipText),
            overlayTrigger = this.getOverlay(tooltipText, tooltip),
            helpBlock = this.getHelpBlock(validationLevel, validationMessage);
        const starEl = isStar ? <span>*</span> : <span/>;

        return (
            <div className={"textArea__wrapper " + textAreaClass + " " + validationLevel}
                 id="companyReg__textAreaDescription">
                <div className="input_label_and_questionMark__wrapper">
                    <label className="inputLabel">
                        {starEl}{label}
                    </label>
                    {overlayTrigger}
                </div>

                <Select
                    multi
                    searchable
                    placeholder={placeholder}
                    options={options}
                    value={this.props.value}
                    onChange={this.onChange}
                    onFocus={this.onFocus}/>

                <div className="subInput__info-wrapper">
                    {helpBlock}
                </div>
            </div>
        );
    }

    private getHelpBlock = (validationLevel: string, validationMessage: string): JSX.Element => {
        return validationLevel ? (
            <HelpBlock className={"warning-text"}>{validationMessage}</HelpBlock>
        ) : null;
    };
    private getOverlay = (tooltipText: string, tooltip: JSX.Element): JSX.Element => {
        return tooltipText && tooltipText.length ?
            (<OverlayTrigger
                placement="top"
                overlay={tooltip}>
                <div className="questionMark">?</div>
            </OverlayTrigger>) : null;
    };
    private getTooltip = (tooltipText: string): JSX.Element => {
        return (
            <Tooltip id="tooltip"><strong>{tooltipText}</strong></Tooltip>
        );
    };

    private onChange = (e) => {
       const values: any[] = e.map((item: IDropdownListValue) => item.value);

       this.props.onChange(values);
    };

    private onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };
}
