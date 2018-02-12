import * as React from "react";
import ReactDropdownMenu, {NestedDropdownMenu} from "react-dd-menu";

export interface ISubItems {
    value: string;
    label: string;
}

export interface IItems {
    label: string;
    subItems: ISubItems[];
}

export interface IDropdownMenuProps {
    disabled?: boolean;
    tooltipPresent: boolean;
    tooltipText?: string;
    placeholder?: string;

    validationLevel?: string;
    validationMessage?: string;

    title: string;
    className: string;
    value: string;
    label: string;

    items: IItems[];

    onChange: (id: string) => void,
    onFocus: (event: React.FocusEvent<HTMLDivElement>) => void,
    isStar?: boolean;
}

export interface IDropdownMenuState {
    isMenuOpen: boolean;
}

export class DropdownMenu extends React.Component<IDropdownMenuProps, IDropdownMenuState> {

    constructor(props: IDropdownMenuProps) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }

    public render(): JSX.Element {
        const list: JSX.Element[] = [];
        let title: string = this.props.title;
        const isStar: boolean = this.props.isStar;

        for (const item of this.props.items) {
            const listItems: JSX.Element[] = [];

            for (const subItem of item.subItems) {
                if (subItem.value === this.props.value) {
                    title = subItem.label;
                }

                listItems.push(
                    <li
                        key={subItem.value}
                        id={subItem.value}
                        onClick={this.onClick}
                    >
                        {subItem.label}
                    </li>);
            }

            list.push(
                <NestedDropdownMenu
                    className={"nestedDropdownMenu-wrapper"}
                    nested="right"
                    direction={"right"}
                    toggle={<a href="#">{item.label}</a>}
                    animate={false}
                    delay={0}
                    enterTimeout={10}
                    leaveTimeout={10}
                    key={item.label}
                >
                    {listItems}
                </NestedDropdownMenu>);
        }

        const starEl = isStar ? <span>*</span> : <span/>;

        return (
            <div className={this.props.className} onFocus={this.props.onFocus}>
                {this.props.tooltipPresent && <div className="input_label_and_questionMark__wrapper">
                    <label className="inputLabel">
                        {starEl}{this.props.label}
                    </label>
                </div>}
                <ReactDropdownMenu
                    className={"reactDropdownMenu-wrapper"}
                    isOpen={this.state.isMenuOpen}
                    direction={"right"}
                    nested="left"
                    close={this.onClose}
                    closeOnInsideClick={true}
                    align={"left"}
                    delay={0}
                    animate={false}
                    enterTimeout={10}
                    leaveTimeout={10}
                    toggle={<button type="button" onClick={this.onToggle}>{title}</button>}
                >
                    {list}
                </ReactDropdownMenu>
            </div>
        );
    }

    private onClose = (): void => {
        this.setState({isMenuOpen: false});
    };
    private onToggle = (): void => {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    };
    private onClick = (e: React.FormEvent<HTMLLIElement>): void => {
        this.props.onChange(e.target["id"]);
    };
}
