import * as React from "react";
import {Button, Dropdown, MenuItem} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Color} from "../constants/Color";

export interface IDropdownWiconProps {
    isActive?: boolean,
    tooltipPresent?: boolean,
    className?: string,
    id: string,
    icon: any,
    label: string,
    disabled: boolean,

    valuesArray: string[],
    callback?: () => void; //@todo improve me with valuesArray
    onFinish?: () => void; //@todo :cry:
    onStart?: () => void; //@todo :cry:
}

export class DropdownWicon extends React.Component<IDropdownWiconProps> {
    public render(): JSX.Element {
        const id: string = this.props.id;
        const icon: any = this.props.icon;
        const label: string = this.props.label;
        const valuesArray: string[] = this.props.valuesArray;
        const isActive: boolean = this.props.isActive;
        const disabled: boolean = this.props.disabled;
        const className: string = this.props.className;

        let btnColorClass: string = "DropdownWicon-toggle dropdownWicon__btn grey_btn";

        if (isActive) {
            btnColorClass = "DropdownWicon-toggle dropdownWicon__btn grey_btn grey_btn_blueColor";
        }

        return (
            <Dropdown className="dropdownWicon" id={id} disabled={disabled}>

                <Dropdown.Toggle className={btnColorClass} disabled={disabled}>
                    <SVGInline
                        svg={icon}
                        fill={isActive ? Color.BLUE : Color.GREY_LIGHT}
                        width="18px"
                        height="18px"
                        className={className}
                    />
                    {label}
                    {/*<span className="caret"></span>*/}
                </Dropdown.Toggle>

                {/*<Dropdown.Toggle className="DropdownWicon-toggle grey_btn" disabled={disabled}/>*/}
                <Dropdown.Menu className="DropdownWicon__items-wrapper" disabled={disabled}>
                    {valuesArray.map((item, index) => {
                        if (item === "FINISH") {
                            return <MenuItem disabled={disabled} key={index} eventKey={index} onClick={this.props.onFinish}>{item}</MenuItem>;
                        }
                        if (item === "START") {
                            return <MenuItem disabled={disabled} key={index} eventKey={index} onClick={this.props.onStart}>{item}</MenuItem>;
                        }
                        return <MenuItem disabled={disabled} key={index} eventKey={index} onClick={this.props.callback}>{item}</MenuItem>;
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
