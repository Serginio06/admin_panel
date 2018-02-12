import * as React from "react";
import {RouteComponentProps} from "react-router";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {changeRecoverEmailAction, recoverPassAction, switchToSigninFormAction} from "../actions";
import {RecoverForm} from "../components/window/RecoverForm";
import {IState} from "../state";

export interface IRecoverPageProps extends RouteComponentProps<any> {
    show: boolean;
    sent: boolean;
    failed: boolean;
    errorCode: string;
    email: string;

    onSwitchToSigninForm: () => void;
    onRecoverEmailChange: (email: string) => void;
    onRecoverPass: (password: string) => void;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class RecoverPage extends React.Component<IRecoverPageProps> {

    constructor(props: IRecoverPageProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <RecoverForm
                    show={this.props.show}
                    sent={this.props.sent}
                    failed={this.props.failed}
                    errorCode={this.props.errorCode}
                    email={this.props.email}

                    onSwitchToSigninForm={this.props.onSwitchToSigninForm}
                    onRecoverEmailChange={this.props.onRecoverEmailChange}
                    onRecoverPass={this.props.onRecoverPass}
                />
            </div>
        );
    }
}

function state2props(state: IState): Partial<IRecoverPageProps> {
    return {
        email: state.recoverPageState.email,
        errorCode: state.recoverPageState.errorCode,
        failed: state.recoverPageState.failed,
        sent: state.recoverPageState.sent,
        show: state.recoverPageState.show,
    };
}

function dispatch2props(dispatch): Partial<IRecoverPageProps> {
    return {
        onSwitchToSigninForm: (): void => dispatch(switchToSigninFormAction()),
        onRecoverEmailChange: (email: string): void => dispatch(changeRecoverEmailAction(email)),
        onRecoverPass: (password: string): void => dispatch(recoverPassAction(password)),
    };
}
