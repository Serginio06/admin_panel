import * as React from "react";
import {Button, Modal} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Alert} from "../../../common/components/Alert/Alert";
import {Input} from "../../../common/components/Input";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {getErrorText} from "../../../common/util/errorUtil";
import {useFacebookDataLogin} from "../../util/facebookUtil";

export interface ISigninFormProps {
    failed: boolean,
    show: boolean,
    keepLogged: boolean,

    errorCode: string,
    email: string,
    password: string,

    onSwitchToRecoverForm: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    onChangeKeepLogged: (keepLogged: boolean) => void;
    onChangeCredential: (credential: string) => void;
    onChangeEmail: (value: string) => void;
    onCancelButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSwitchToSignupForm: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    onLoginViaFacebook: (facebookId: string, keepLogged: boolean) => void;

    onLogin: (email: string, password: string, keepLogged: boolean) => void;
}

export class SigninForm extends React.Component<ISigninFormProps> {

    constructor(props: ISigninFormProps) {
        super(props);
    }

    public render() {
        const diamond: string = require("../../../../resources/icons/svg/diamondWhite.svg");
        const closeIcon: string = require("../../../../resources/icons/close.png");

        const disabled: boolean = this.props.email === "" || this.props.password === "",
            errElem: JSX.Element = this.props.failed ? <Alert type={"error"} text={getErrorText(this.props.errorCode)}/> : null;

        return (
            <Modal show={this.props.show} onHide={this.onModalHide}>
                <div className="form-wrapper">

                    <div className="form__header">

                        <div className="form__header__cancelBtn-wrapper">
                            <button className="form__header__cancelBtn" onClick={this.props.onCancelButtonClick}>
                                <img src={closeIcon} className="form__header__close-img"/>
                            </button>
                        </div>

                        <div className="form__header__logo-wrapper">
                            <SVGInline svg={diamond} width="31px" className="form__header__logo-img"/>
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
                        {errElem}
                        <div className="form__content__inputs-wrapper" data-test-id="login-form">
                            <Input
                                value={this.props.email}
                                data-test-id="login"
                                onChange={this.props.onChangeEmail}
                                inputClass={"input__wrapper-w100"}
                                placeholder={"E-mail"}
                            />

                            <Input
                                type={"password"}
                                data-test-id="password"
                                value={this.props.password}
                                onChange={this.props.onChangeCredential}
                                inputClass={"input__wrapper-w100"}
                                placeholder={"Password"}
                            />
                        </div>

                        <div className="form__content__keepLogin-wrapper">

                            <div className="form__content__keepLogin__checkbox-wrapper">
                                <Checkbox
                                    data-test-id="keepLogged"
                                    small
                                    isChecked={this.props.keepLogged}
                                    onChange={this.onChangeKeepLogged}
                                />
                                <div>
                                    Keep me logged in
                                </div>
                            </div>

                            <a href={"javascript://"} onClick={this.props.onSwitchToRecoverForm}>
                                {"Forgot Password?"}
                            </a>
                        </div>

                        <div className="form__content__loginTermsText-wrapper">
                            <p>By logging in, you agree to
                                Treasure Systems’s <a href="/privacy" target="_blank">
                                    {"Privacy Policy"}
                                </a> and <a href="/terms" target="_blank">{"Terms of Use"}</a>
                            </p>
                        </div>

                        <div className="form__content__inputBtn-wrapper">
                            <Button
                                className="black__btn form__content__actionBtn"
                                data-test-id="submit"
                                disabled={disabled}
                                onClick={this.onLoginClick}
                            >
                                {"LOG IN"}
                            </Button>

                            <Button className="form__content__facebookBtn" onClick={this.onLoginViaFacebookClick}>
                                <i className="fa fa-facebook fa-lg" aria-hidden="true"/>
                                <span>LOG IN WITH FACEBOOK</span>
                            </Button>

                        </div>

                        <div className="form__content__signUpText-wrapper">
                            <p>{"Don\'t have an account?"}</p>
                            <a href={"javascript://"} onClick={this.props.onSwitchToSignupForm}>
                                {"Join now"}
                            </a>
                        </div>

                    </div>
                </div>
            </Modal>
        );
    }

    private onLoginClick = (): void => {
        const email: string = this.props.email,
            password: string = this.props.password,
            keepLogged: boolean = this.props.keepLogged;

        this.props.onLogin(email, password, keepLogged);
    };

    private onLoginViaFacebookClick = (): void => {
        useFacebookDataLogin(this.props.onLoginViaFacebook, this.props.keepLogged);
    };

    private onModalHide = (): void => {
        // do nothing
    };

    private onChangeKeepLogged = (e: React.FormEvent<Checkbox>): void => this.props.onChangeKeepLogged(!e.target["checked"]);
}
