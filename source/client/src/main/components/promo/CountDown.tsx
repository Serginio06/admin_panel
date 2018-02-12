import * as classnames from "classnames";
import * as React from "react";
import "../../sass/components/main/promo/_count-down.scss";
import Timer = NodeJS.Timer;

interface ICountDownProps {
    time: number;
    className?: string;
}

interface ICountDownState {
    hh: string;
    mm: string;
    ss: string;
    timeOut: boolean;
}

export class CountDown extends React.Component<ICountDownProps, ICountDownState> {
    private timer: any = null;

    constructor(props: ICountDownProps) {
        super(props);
        this.state = {
            hh: "00",
            mm: "00",
            ss: "00",
            timeOut: true,
        };
    }

    public componentWillReceiveProps(newProps: ICountDownProps): void {
        if (this.props.time !== newProps.time || (!this.timer && newProps.time)) {
            this.setState({
                hh: this.timeToString(+newProps.time),
                mm: this.timeToString(),
                ss: this.timeToString(),
                timeOut: false,
            }, () => {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = setInterval(this.tick, 1000);
            });
        }
    }

    public componentDidMount(): void {
        this.setState({
            hh: this.timeToString(+this.props.time),
            mm: this.timeToString(),
            ss: this.timeToString(),
            timeOut: false,
        }, () => {
            this.timer = setInterval(this.tick, 1000);
        });
    }

    public componentWillUnmount(): void {
        clearInterval(this.timer);
    }

    public render(): JSX.Element {
        const {className} = this.props;
        const {timeOut} = this.state;

        return (
            <b className={classnames("CountDown", className, {timeOut})}>
                {this.state.hh}
                {":"}
                {this.state.mm}
                {":"}
                {this.state.ss}
            </b>
        );
    }

    private tick = (): void => {
        if (parseInt(this.state.hh, 10) === 0 && parseInt(this.state.mm, 10) === 0 && parseInt(this.state.ss, 10) === 0) {
            this.setState({
                hh: "00",
                mm: "00",
                ss: "00",
                timeOut: true,
            }, () => {
                clearInterval(this.timer);
            });
            return;
        }
        if (parseInt(this.state.ss, 10) > 0) {
            this.setState({
                ss: this.timeToString(parseInt(this.state.ss, 10) - 1),
            });
            return;
        }
        if (parseInt(this.state.ss, 10) === 0 && parseInt(this.state.mm, 10) > 0) {
            this.setState({
                mm: this.timeToString(parseInt(this.state.mm, 10) - 1),
                ss: this.timeToString(59),
            });
            return;
        }
        if (parseInt(this.state.mm, 10) === 0 && parseInt(this.state.ss, 10) === 0) {
            this.setState({
                hh: this.timeToString(parseInt(this.state.hh, 10) - 1),
                mm: this.timeToString(59),
                ss: this.timeToString(59),
            });
        }
    };

    private timeToString = (time: number = 0): string => {
        return time < 10 ? `0${time}` : time.toString();
    };
}
