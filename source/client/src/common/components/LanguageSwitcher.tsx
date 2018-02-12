import * as React from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {DataLanguage} from "../constants/dataLanguageType";

interface ILanguageSwitcherProps {
    value: string,
    label?: string,
    tooltipText?: string,

    onChange: () => void;
}

interface ILanguageSwitcherState {
    en: string;
    ru: string;
}

export class LanguageSwitcher extends React.Component<ILanguageSwitcherProps, ILanguageSwitcherState> {

    constructor(props: ILanguageSwitcherProps) {
        super(props);

        this.state = {
            en: "language_switcher__active_item",
            ru: "language_switcher__inactive_item",
        };
    }

    public componentWillReceiveProps(newProps): void {
        if (newProps.value === DataLanguage.RU) {
            this.setState({
                en: "language_switcher__inactive_item",
                ru: "language_switcher__active_item",
            });
        } else {
            this.setState({
                en: "language_switcher__active_item",
                ru: "language_switcher__inactive_item",
            });
        }
    }

    public render(): JSX.Element {
        const {label, tooltipText} = this.props;

        const tooltip: JSX.Element = this.getTooltip(tooltipText);
        const overlayTrigger: JSX.Element = this.getOverlay(true, tooltip);

        return (
            <div className={"input__wrapper"}>
                <div className="input_label_and_questionMark__wrapper">
                    <label className="inputLabel">
                        {label}
                    </label>

                    {overlayTrigger}
                </div>

                <Button onClick={this.onClick} className="language_switcher__btn">
                    <span className={this.state.en}>{"EN"}</span>
                    <span className={this.state.ru}>{"RU"}</span>
                </Button>
            </div>
        );
    }

    private onClick = (): void => {
        if (this.state.en === "language_switcher__active_item") {
            this.setState({
                en: "language_switcher__inactive_item",
                ru: "language_switcher__active_item",
            });
        } else {
            this.setState({
                en: "language_switcher__active_item",
                ru: "language_switcher__inactive_item",
            });
        }

        if (this.props.onChange) {
            this.props.onChange();
        }
    };

    private getOverlay = (tooltipPresent: boolean, tooltipText: JSX.Element): JSX.Element => {
        return tooltipPresent ?
            (
                <OverlayTrigger
                    placement="top"
                    overlay={tooltipText}>
                    <div className="questionMark">?</div>
                </OverlayTrigger>
            ) : null;
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
}
