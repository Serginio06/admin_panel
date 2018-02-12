import * as moment from "moment";
import {Moment} from "moment";
import TimePicker from "rc-time-picker";
import * as React from "react";

interface ITimePickerInputProps {
    value: string,
    validationLevel: string,
    inputClass: string,
    placeholder: string,

    onChange: (v) => void;
}

interface ITimePickerInputState {
    value: Moment;
}

export class TimepickerInput extends React.Component<ITimePickerInputProps, ITimePickerInputState> {

    constructor(props: ITimePickerInputProps) {
        super(props);

        this.state = {
            value: moment(),
        };
    }

    public componentWillReceiveProps(nextProps: ITimePickerInputProps): void {
        if (nextProps.value && nextProps.value !== this.state.value.toString()) {
            this.setState({
                value: moment(nextProps.value),
            });
        }
    }

    public render(): JSX.Element {
        const {validationLevel, inputClass} = this.props;

        return (
            <div className={`input__wrapper ${inputClass} ${validationLevel}`}>
                <TimePicker
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}/>;
            </div>
        );
    }

    private onChange = (date: Moment): void => {
        this.setState({
            value: date,
        });

        if (this.props.onChange) {
            this.props.onChange(date.format());
        }
    };
}
