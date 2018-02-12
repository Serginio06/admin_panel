import * as React from "react";
import {RouteComponentProps} from "react-router";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {applyNewPasswordAction, changeNewPasswordAction, changeNewVerifyAction} from "../actions";
import {PasswordForm} from "../components/PasswordForm";
import {IReduxProps} from "../../../../types/vendor";
import {IState} from "../state";

interface IPasswordPageProps extends RouteComponentProps<any>, IReduxProps {
    changed: boolean;
    errorCode: string;
    failed: boolean;
    newPassword: string;
    newVerify: string;
    newPasswordValidationLevel: string;
    newVerifyValidationLevel: string;
    newPasswordValidationMessage: string;
    newVerifyValidationMessage: string;

    onChangeNewPassword: (e) => void;
    onCancelButtonClick?: (e) => void;
    onChangeNewVerify: (e) => void;
    onApplyNewPassword: (e) => void;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class PasswordPage extends React.Component<IPasswordPageProps> {
    constructor(props: IPasswordPageProps) {
        super(props);
    }

    public render() {
        return (
            <div className="passwordPage">
                <PasswordForm
                    failed={this.props.failed}
                    errorCode={this.props.errorCode}
                    changed={this.props.changed}

                    newPassword={this.props.newPassword}
                    newPasswordValidationLevel={this.props.newPasswordValidationLevel}
                    newPasswordValidationMessage={this.props.newPasswordValidationMessage}

                    newVerify={this.props.newVerify}
                    newVerifyValidationLevel={this.props.newVerifyValidationLevel}
                    newVerifyValidationMessage={this.props.newVerifyValidationMessage}

                    onChangeNewPassword={this.props.onChangeNewPassword}
                    onChangeNewVerify={this.props.onChangeNewVerify}
                    onApplyNewPassword={this.props.onApplyNewPassword}
                />
            </div>
        );
    }
}

function state2props(state: IState): Partial<IPasswordPageProps> {
    return {
        changed: state.passwordPageState.changed,
        errorCode: state.passwordPageState.errorCode,
        failed: state.passwordPageState.failed,

        newPassword: state.passwordPageState.newPassword,
        newPasswordValidationLevel: state.passwordPageState.newPasswordValidationLevel,
        newPasswordValidationMessage: state.passwordPageState.newPasswordValidationMessage,

        newVerify: state.passwordPageState.newVerify,
        newVerifyValidationLevel: state.passwordPageState.newVerifyValidationLevel,
        newVerifyValidationMessage: state.passwordPageState.newVerifyValidationMessage,
    };
}

function dispatch2props(dispatch): Partial<IPasswordPageProps> {
    return {
        onApplyNewPassword: (newPassword: string) => dispatch(applyNewPasswordAction(newPassword)),
        onChangeNewPassword: (newPassword: string) => dispatch(changeNewPasswordAction(newPassword)),
        onChangeNewVerify: (newVerify: string) => dispatch(changeNewVerifyAction(newVerify)),
    };
}
