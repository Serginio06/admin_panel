import * as React from "react";
import {Button, Modal} from "react-bootstrap";
import {Alert} from "../../../common/components/Alert/Alert";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {Input} from "../../../common/components/Input";
import {VALIDATION_LEVEL_ERROR} from "../../../common/constants/ValidationLevelType";
import {getErrorText} from "../../../common/util/errorUtil";
import {ISignupPageState} from "../../state";
import {useFacebookData} from "../../util/facebookUtil";

import SVGInline from "react-svg-inline";

export interface ISignupFormProps {
    signupPageState: ISignupPageState;

    onSwitchToRecoverForm?: (e) => void;
    onCheckEmail: () => void;
    onRegisterUserViaFacebook: (facebookId: string, name: string) => void;
    onRegisterUser: (e: React.MouseEvent<Button>) => void;
    onChangeIsOnDispatch: () => void;
    onChangeVerify: (value: string) => void;
    onChangeEmail: (email: string) => void;
    onChangePassword: (password: string) => void;
    onChangeFamilyName: (name: string) => void;
    onChangeFirstName: (name: string) => void;
    onSwitchToSigninForm: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;

    onCancelButtonClick: (e: React.MouseEvent<Button>) => void

}

export class SignupForm extends React.Component<ISignupFormProps> {

    private timeoutId: any = null;

    constructor(props: ISignupFormProps) {
        super(props);

        this.onModalHide = this.onModalHide.bind(this);

        this.onEmailKeyDown = this.onEmailKeyDown.bind(this);
        this.onEmailBlur = this.onEmailBlur.bind(this);

        this.onSignupViaFacebookClick = this.onSignupViaFacebookClick.bind(this);
    }

    public render(): JSX.Element {
        const diamond = require("../../../../resources/icons/svg/diamondWhite.svg");
        const closeIcon = require("../../../../resources/icons/close.png");

        const pageState: ISignupPageState = this.props.signupPageState,
            disabled: boolean = pageState.firstName === ""
                || pageState.familyName === ""
                || pageState.email === ""
                || pageState.password === ""
                || pageState.verify === ""
                || pageState.firstNameValidationLevel === VALIDATION_LEVEL_ERROR
                || pageState.familyNameValidationLevel === VALIDATION_LEVEL_ERROR
                || pageState.emailValidationLevel === VALIDATION_LEVEL_ERROR
                || pageState.passwordValidationLevel === VALIDATION_LEVEL_ERROR
                || pageState.verifyValidationLevel === VALIDATION_LEVEL_ERROR
                || !pageState.emailChecked
                || pageState.emailCheckFailed,

            errElem: JSX.Element = pageState.failed ?
                <Alert type={"error"} text={getErrorText(pageState.errorCode)}/> : null;

        return (
            <Modal show={true} onHide={this.onModalHide}>
                <div className="form-wrapper">

                    <div className="form__header">

                        <div className="form__header__cancelBtn-wrapper">
                            <button className="form__header__cancelBtn" onClick={this.props.onSwitchToSigninForm}>
                                <img src={closeIcon} className="form__header__close-img"/>
                            </button>
                        </div>

                        <div className="form__header__logo-wrapper">
                            <SVGInline svg={diamond} width="30px" heght="25px" className="form__header__logo-img"/>
                            <div className="form__header__logo__siteName-wrapper">
                                <div className="form__header__logo__siteName__topRow">treasure</div>
                                <div className="form__header__logo__siteName__bottomRow">systems</div>
                            </div>
                        </div>
                        <div className="form__header__title-wrapper">
                            <h1>{"ADMIN ACCOUNT FOR A COMPANY'S REPRESENTER"}</h1>
                        </div>
                    </div>

                    <div className="form__content-wrapper">
                        <div className="form__content__facebookBtn-wrapper">
                            <Button className="form__content__facebookBtn" onClick={this.onSignupViaFacebookClick}>
                                <i className="fa fa-facebook fa-lg" aria-hidden="true"/>
                                <span>REGISTER WITH FACEBOOK</span>
                            </Button>
                        </div>

                        <div className="form__content__orSeparator">
                            OR
                        </div>

                        <div className="form__content__inputs-wrapper">
                            {errElem}
                            <Input
                                placeholder={"First Name"}
                                data-test-id="firstName"
                                validationLevel={pageState.firstNameValidationLevel}
                                validationMessage={pageState.firstNameValidationMessage}
                                value={pageState.firstName}
                                onChange={this.props.onChangeFirstName}
                                inputClass={"input__wrapper-w100"}
                            />

                            <Input
                                placeholder={"Last Name"}
                                data-test-id="familyName"
                                validationLevel={pageState.familyNameValidationLevel}
                                validationMessage={pageState.familyNameValidationMessage}
                                value={pageState.familyName}
                                onChange={this.props.onChangeFamilyName}
                                inputClass={"input__wrapper-w100"}
                            />

                            <Input
                                placeholder={"E-mail"}
                                data-test-id="email"
                                validationLevel={pageState.emailValidationLevel}
                                validationMessage={pageState.emailValidationMessage}
                                value={pageState.email}
                                onChange={this.props.onChangeEmail}
                                onKeyDown={this.onEmailKeyDown}
                                onBlur={this.onEmailBlur}
                                inputClass={"input__wrapper-w100"}
                            />

                            <Input
                                data-test-id="password"
                                placeholder={"Password"}
                                type={"password"}
                                validationLevel={pageState.passwordValidationLevel}
                                validationMessage={pageState.passwordValidationMessage}
                                value={pageState.password}
                                onChange={this.props.onChangePassword}
                                inputClass={"input__wrapper-w100"}
                            />

                            <div className={"form__content__description"}>
                                {"Minimum of 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number"}
                            </div>

                            <Input
                                placeholder={"Retype Password"}
                                tooltipText={"Retype Password"}
                                data-test-id="retypePassword"
                                type={"password"}
                                value={pageState.verify}
                                validationLevel={pageState.verifyValidationLevel}
                                validationMessage={pageState.verifyValidationMessage}
                                onChange={this.props.onChangeVerify}
                                inputClass={"input__wrapper-w100"}
                            />
                        </div>

                        <div className="form__content__keepLogin-wrapper">
                            <div className="form__content__keepLogin__checkbox-wrapper-w100">
                                <Checkbox
                                    data-test-id="isOnDispatch"
                                    small
                                    isChecked={pageState.isOnDispatch}
                                    onChange={this.props.onChangeIsOnDispatch}
                                />
                                <div>
                                    {"Sign up for emails to hear all the latest from Treasure Systems"}
                                </div>
                            </div>
                        </div>

                        <div className="form__content__termsText-wrapper">
                            <p>
                                By creating an account, you agree to
                                Treasure Systems <a href="/privacy" target="_blank">{"Privacy Policy"}</a> and <a
                                href="/terms" target="_blank">{"Terms of Use"}</a>
                            </p>
                        </div>

                        <div className="form__content__inputBtn-wrapper">
                            <Button
                                data-test-id="submit"
                                className="black__btn form__content__actionBtn"
                                disabled={disabled}
                                onClick={this.props.onRegisterUser}
                            >
                                {"CREATE ACCOUNT"}
                            </Button>
                        </div>

                        <div className="form__content__signUpText-wrapper">
                            <p>{"Already have an account?"}</p>
                            <a href={"javascript://"} onClick={this.props.onSwitchToSigninForm}>
                                {"Sign in"}
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    private onSignupViaFacebookClick(): void {
        useFacebookData(this.props.onRegisterUserViaFacebook, false);
    }

    private onEmailKeyDown(e: React.KeyboardEvent<any>): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        if (e.keyCode === 13) {
            this.props.onCheckEmail();
        } else {
            this.timeoutId = setTimeout(() => {
                this.props.onCheckEmail();
            }, 3000);
        }
    }

    private onEmailBlur(): void {
        if (this.props.signupPageState.emailChecked) {
            return;
        }

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.props.onCheckEmail();
    }

    private onModalHide(): void {
        // do nothing
    }
}
