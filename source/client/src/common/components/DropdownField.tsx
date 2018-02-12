import * as React from "react";
import Select, {Creatable} from "react-select";

export interface IDropdownFieldProps {
    disabled: boolean,
    isCreatable: boolean,

    value: string,
    label?: string,
    placeholder: string,
    dropdownClass?: string,

    options: string[],

    onChange: (codeType: string) => void,
    onFocus: (event: FocusEvent) => void,
}

export class DropdownField extends React.Component<IDropdownFieldProps> {

    constructor(props: IDropdownFieldProps) {
        super(props);
    }

    public render() {
        if (this.props.isCreatable) {
            return (
                <div className="section">
                    <Creatable
                        id="state-select"
                        name="selected-state"
                        simpleValue
                        clearable
                        searchable
                        disabled={false}
                        placeholder={this.props.placeholder}
                        options={this.props.options}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onFocus={this.onFocus}
                    />
                </div>
            );
        }

        return (
            <div className="section">
                <Select
                    id="state-select"
                    name="selected-state"
                    simpleValue
                    clearable
                    searchable
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    options={this.props.options}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onFocus={this.onFocus}
                />
            </div>
        );
    }

    private onFocus = (e: FocusEvent): void => {
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }
}
