import * as React from "react";
import {Button} from "react-bootstrap";
import {Input} from "../../common/components/Input";
import {VALIDATION_LEVEL_ERROR} from "../../common/constants/ValidationLevelType";

export interface IPasswordFormProps {
    failed?: boolean;
    errorCode?: string;
    changed?: boolean;
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
    onLoginClick?: (e) => void;
}

export class PasswordForm extends React.Component<IPasswordFormProps> {

    constructor(props: IPasswordFormProps) {
        super(props);
    }

    public render() {
        const disabled = this.props.newPassword === ""
            || this.props.newVerify === ""
            || this.props.newPasswordValidationLevel === VALIDATION_LEVEL_ERROR
            || this.props.newVerifyValidationLevel === VALIDATION_LEVEL_ERROR;

        return (

            <div className="block__full-width">
                <div className="form-wrapper">

                    <div className="form__header">

                        <div className="form__header__cancelBtn-wrapper"/>

                        <div className="form__header__title-wrapper">
                            <h1>{"NEW PASSWORD"}</h1>
                        </div>
                    </div>

                    <div className="form__content-wrapper">

                        <div className="form__content__inputs-wrapper">

                            <Input label={""}
                                   placeholder={"New password"}
                                   type={"password"}
                                   validationLevel={this.props.newPasswordValidationLevel}
                                   validationMessage={this.props.newPasswordValidationMessage}
                                   onChange={this.props.onChangeNewPassword}
                                   inputClass={"input__wrapper-w100"}
                                   value={this.props.newPassword}/>

                            <Input label={""}
                                   placeholder={"Verify"}
                                   type={"password"}
                                   validationLevel={this.props.newVerifyValidationLevel}
                                   validationMessage={this.props.newVerifyValidationMessage}
                                   onChange={this.props.onChangeNewVerify}
                                   value={this.props.newVerify}
                                   inputClass={"input__wrapper-w100"}
                            />

                        </div>

                        <div className="form__content__inputBtn-wrapper">
                            <Button className="black__btn form__content__actionBtn"
                                    disabled={disabled}
                                    onClick={this.props.onLoginClick}
                            >
                                {"APPLY NEW PASSWORD"}
                            </Button>

                            <Button className="black__btn form__content__actionBtn"
                                    disabled={disabled}
                                    onClick={this.props.onCancelButtonClick}
                            >
                                {"Cancel"}
                            </Button>

                        </div>

                    </div>
                </div>
            </div>

        );
    }

    private onClick = () => {
        this.props.onApplyNewPassword(this.props.newPassword);
    };
}
