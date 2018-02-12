import * as React from "react";
import {RouteComponentProps} from "react-router";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {
    changeCredentialAction,
    changeKeepLoggedAction,
    changeLoginAction,
    loginAction,
    loginViaFacebookAction,
    switchToRecoverFormAction,
    switchToSignupFormAction,
} from "../actions";
import {SigninForm} from "../components/window/SigninForm";
import {IState} from "../state";
import {IReduxProps} from "../../../../types/vendor";

export interface ISigninPageProps extends RouteComponentProps<any>, IReduxProps {
    show: boolean;
    failed: boolean;
    errorCode: string;
    email: string;
    password: string;
    keepLogged: boolean;

    onLogin: (email: string, password: string, keepLogged: boolean) => void;
    onChangeEmail: (email: string) => void;
    onChangeCredential: (credential: string) => void;
    onChangeKeepLogged: () => void;
    onLoginViaFacebook: (facebookId: string, keepLogged: boolean) => void;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class SigninPage extends React.Component<ISigninPageProps> {

    constructor(props: ISigninPageProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <SigninForm
                    show={this.props.show}
                    failed={this.props.failed}
                    errorCode={this.props.errorCode}
                    email={this.props.email}
                    password={this.props.password}
                    keepLogged={this.props.keepLogged}

                    onLogin={this.props.onLogin}
                    onChangeEmail={this.props.onChangeEmail}
                    onChangeCredential={this.props.onChangeCredential}
                    onChangeKeepLogged={this.props.onChangeKeepLogged}
                    onLoginViaFacebook={this.props.onLoginViaFacebook}

                    onSwitchToRecoverForm={this.onSwitchToRecoverForm}
                    onSwitchToSignupForm={this.onSwitchToSignupForm}

                    onCancelButtonClick={this.onCancelButtonClick}
                />
            </div>
        );
    }

    private onCancelButtonClick(): void {
        document.location.href = "/";
    }

    private onSwitchToRecoverForm = (): void => {
        this.props.dispatch(switchToRecoverFormAction());
        this.props.history.push("recover");
    };
    private onSwitchToSignupForm = (): void => {
        this.props.dispatch(switchToSignupFormAction());
        this.props.history.push("signup");
    };
}

function state2props(state: IState): Partial<ISigninPageProps> {
    return {
        errorCode: state.signinPageState.errorCode,
        failed: state.signinPageState.failed,
        keepLogged: state.signinPageState.keepLogged,
        show: state.signinPageState.show,

        email: state.signinPageState.email,
        password: state.signinPageState.password,
    };
}

function dispatch2props(dispatch): Partial<ISigninPageProps> {
    return {
        onChangeCredential: (credential: string) => dispatch(changeCredentialAction(credential)),
        onChangeEmail: (email: string) => dispatch(changeLoginAction(email)),
        onChangeKeepLogged: () => dispatch(changeKeepLoggedAction()),
        onLogin: (email: string, password: string, keepLogged: boolean) => dispatch(loginAction(email, password, keepLogged)),
        onLoginViaFacebook: (facebookId: string, keepLogged: boolean) => dispatch(loginViaFacebookAction(facebookId, keepLogged)),

        dispatch,
    };
}
