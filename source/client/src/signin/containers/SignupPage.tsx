import * as React from "react";
import {RouteComponentProps} from "react-router";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {
    changeEmailAction,
    changeFamilyNameAction,
    changeFirstNameAction,
    changeIsOnDispatchAction,
    changePasswordAction,
    changeVerifyAction,
    checkEmailAction,
    registerUserAction,
    registerUserViaFacebookAction,
    switchToSigninFormAction,
    switchToSignupFormAction,
} from "../actions";
import {SignupForm} from "../components/window/SignupForm";
import {ISignupPageState as ISignupState, IState} from "../state";
import {IReduxProps} from "../../../../types/vendor";

export interface ISignupPageProps extends RouteComponentProps<any>, IReduxProps {
    signupPageState: ISignupState;
    changeFirstNameAction: () => void;
    changeFamilyNameAction: () => void;
    changeEmailAction: (email: string) => void;
    changePasswordAction: () => void;
    changeVerifyAction: () => void;
    changeIsOnDispatchAction: () => void;
    registerUserViaFacebookAction: (facebookId: string, name: string) => void;
    registerUserAction: (firstName: string, familyName: string, email: string, password: string, verify: string) => void;
    switchToSigninFormAction: () => void;
    switchToSignupFormAction: () => void;
    onChangeEmail: (email: string) => void;
    onChangeFamilyName: (familyName: string) => void;
    onChangeFirstName: (firstName: string) => void;
    onChangeIsOnDispatch: () => void;
    onChangePassword: (password: string) => void;
    onChangeVerify: (verify: string) => void;
    onCheckEmail: (email: string) => void;
    onRegisterUserViaFacebook: (facebookId: string, name: string) => void;
    onRegisterUser: (firstName: string, familyName: string, email: string, password: string, verify: string) => void;
    onSwitchToSigninForm: () => void;
    onSwitchToSignupForm: () => void;
}

export interface ISignupPageState {
}

function state2props(state: IState): Partial<ISignupPageProps> {
    return {
        signupPageState: state.signupPageState,
    };
}

function dispatch2props(dispatch): Partial<ISignupPageProps> {
    return {
        onChangeEmail: (email: string) => dispatch(changeEmailAction(email)),
        onChangeFamilyName: (familyName: string) => dispatch(changeFamilyNameAction(familyName)),
        onChangeFirstName: (firstName: string) => dispatch(changeFirstNameAction(firstName)),
        onChangeIsOnDispatch: () => dispatch(changeIsOnDispatchAction()),
        onChangePassword: (password: string) => dispatch(changePasswordAction(password)),
        onChangeVerify: (verify: string) => dispatch(changeVerifyAction(verify)),
        onCheckEmail: (email: string) => dispatch(checkEmailAction(email)),
        onRegisterUser: (firstName: string, familyName: string, email: string, password: string, verify: string) =>
            dispatch(registerUserAction(firstName, familyName, email, password, verify)),
        onRegisterUserViaFacebook: (facebookId: string, name: string) => dispatch(registerUserViaFacebookAction(facebookId, name)),
        onSwitchToSigninForm: () => dispatch(switchToSigninFormAction()),
        onSwitchToSignupForm: () => dispatch(switchToSignupFormAction()),
    }
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class SignupPage extends React.Component<ISignupPageProps, ISignupPageState> {
    constructor(props: ISignupPageProps) {
        super(props);

        this.onCheckEmail = this.onCheckEmail.bind(this);
        this.onRegisterUser = this.onRegisterUser.bind(this);
        this.onRegisterUserViaFacebook = this.onRegisterUserViaFacebook.bind(this);
        this.onCancelButtonClick = this.onCancelButtonClick.bind(this);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div>
                <SignupForm
                    signupPageState={this.props.signupPageState}
                    onChangeFirstName={this.props.onChangeFirstName}
                    onChangeFamilyName={this.props.onChangeFamilyName}
                    onChangeEmail={this.props.onChangeEmail}
                    onChangePassword={this.props.onChangePassword}
                    onChangeVerify={this.props.onChangeVerify}
                    onChangeIsOnDispatch={this.props.onChangeIsOnDispatch}
                    onCheckEmail={this.onCheckEmail}
                    onRegisterUser={this.onRegisterUser}
                    onRegisterUserViaFacebook={this.onRegisterUserViaFacebook}
                    onCancelButtonClick={this.onCancelButtonClick}
                    onSwitchToSigninForm={this.onSwitchToSigninForm}
                />
            </div>
        );
    }

    private onCheckEmail(): void {
        const email: string = this.props.signupPageState.email;

        if (email) {
            this.props.onChangeEmail(email);
        }
    }

    private onRegisterUser(): void {
        const signupUserPage: ISignupState = this.props.signupPageState,
            firstName: string = signupUserPage.firstName,
            familyName: string = signupUserPage.familyName,
            email: string = signupUserPage.email,
            password: string = signupUserPage.password,
            verify: string = signupUserPage.verify;

        this.props.onRegisterUser(firstName, familyName, email, password, verify);
    }

    private onRegisterUserViaFacebook(facebookId: string, name: string): void {
        this.props.onRegisterUserViaFacebook(facebookId, name);
    }

    private onCancelButtonClick(): void {
        document.location.href = "/";
    }

    private onSwitchToSigninForm = (): void => {
        this.props.onSwitchToSigninForm();
        this.props.history.push("signin");
    };
}
