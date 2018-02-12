import {Action} from "redux";
import {
    CHANGE_CREDENTIAL,
    CHANGE_EMAIL,
    CHANGE_FAMILY_NAME,
    CHANGE_FIRST_NAME,
    CHANGE_IS_ON_DISPATCH,
    CHANGE_KEEP_LOGGED,
    CHANGE_LOGIN,
    CHANGE_PASSWORD,
    CHANGE_RECOVER_EMAIL,
    CHANGE_VERIFY,
    CHECK_EMAIL_FAILED,
    CHECK_EMAIL_SEND,
    CHECK_EMAIL_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SEND,
    LOGIN_SUCCESS,
    LOGIN_VIA_FACEBOOK_FAILED,
    LOGIN_VIA_FACEBOOK_SEND,
    LOGIN_VIA_FACEBOOK_SUCCESS,
    RECOVER_PASS_FAILED,
    RECOVER_PASS_SEND,
    RECOVER_PASS_SUCCESS,
    REGISTER_USER_FAILED,
    REGISTER_USER_SEND,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_VIA_FACEBOOK_FAILED,
    REGISTER_USER_VIA_FACEBOOK_SEND,
    REGISTER_USER_VIA_FACEBOOK_SUCCESS,
    SWITCH_TO_RECOVER_FORM,
    SWITCH_TO_SIGNIN_FORM,
    SWITCH_TO_SIGNUP_FORM,
} from "../constants";
import {IState} from "../state";
import {initReducer} from "./initReducer";
import {changeRecoverEmailReducer} from "./recover/changeRecoverEmail";
import {recoverPassFailedReducer, recoverPassSendReducer, recoverPassSuccessReducer} from "./recover/recoverPass";
import {changeCredentialReducer} from "./signin/changeCredential";
import {changeKeepLoggedReducer} from "./signin/changeKeepLogged";
import {changeLoginReducer} from "./signin/changeLogin";
import {loginFailedReducer, loginSendReducer, loginSuccessReducer} from "./signin/login";
import {changePasswordReducer} from "./signup/chanePassword";
import {changeEmailReducer} from "./signup/changeEmail";
import {changeFamilyNameReducer} from "./signup/changeFamilyName";
import {changeFirstNameReducer} from "./signup/changeFirstName";
import {changeIsOnDispatchReducer} from "./signup/changeIsOnDispatch";
import {changeVerifyReducer} from "./signup/changeVerify";
import {checkEmailFailedReducer, checkEmailSendReducer, checkEmailSuccessReducer} from "./signup/checkEmail";
import {registerUserFailedReducer, registerUserSendReducer, registerUserSuccessReducer} from "./signup/registerUser";
import {switchToRecoverFormReducer} from "./switchToRecoverForm";
import {switchToSigninFormReducer} from "./switchToSigninForm";
import {switchToSignupFormReducer} from "./switchToSignupForm";
import {IEmailAction} from "../actions/signup/changeEmail";
import {ILoginAction} from "../actions/signin/changeLogin";
import {ICredentialAction} from "../actions/signin/changeCredential";
import {ISuccessCheckEmailAction} from "../actions/signup/checkEmail";
import {IPasswordAction} from "../actions/signup/changePassword";
import {IVerifyAction} from "../actions/signup/changeVerify";
import {IFirstNameAction} from "../actions/signup/changeFirstName";
import {IFamilyNameAction} from "../actions/signup/changeFamilyName";
import {IFailedAction} from "../../common/actions";

export default function reducer(state: IState, action: Action): IState {
    switch (action.type) {
        case "@@redux/INIT":
            return initReducer(state, action);

        case CHANGE_RECOVER_EMAIL:
            return changeRecoverEmailReducer(state, action as IEmailAction);

        case RECOVER_PASS_SEND:
            return recoverPassSendReducer(state, action);
        case RECOVER_PASS_SUCCESS:
            return recoverPassSuccessReducer(state, action);
        case RECOVER_PASS_FAILED:
            return recoverPassFailedReducer(state, action as IFailedAction);

        case CHANGE_LOGIN:
            return changeLoginReducer(state, action as ILoginAction);
        case CHANGE_CREDENTIAL:
            return changeCredentialReducer(state, action as ICredentialAction);
        case CHANGE_KEEP_LOGGED:
            return changeKeepLoggedReducer(state, action);

        case SWITCH_TO_SIGNIN_FORM:
            return switchToSigninFormReducer(state, action);
        case SWITCH_TO_RECOVER_FORM:
            return switchToRecoverFormReducer(state, action);
        case SWITCH_TO_SIGNUP_FORM:
            return switchToSignupFormReducer(state, action);

        case LOGIN_SEND:
        case LOGIN_VIA_FACEBOOK_SEND:
            return loginSendReducer(state, action);
        case LOGIN_SUCCESS:
        case LOGIN_VIA_FACEBOOK_SUCCESS:
            return loginSuccessReducer(state, action);
        case LOGIN_FAILED:
        case LOGIN_VIA_FACEBOOK_FAILED:
            return loginFailedReducer(state, action as IFailedAction);

        case CHECK_EMAIL_SEND:
            return checkEmailSendReducer(state, action);
        case CHECK_EMAIL_SUCCESS:
            return checkEmailSuccessReducer(state, action as ISuccessCheckEmailAction);
        case CHECK_EMAIL_FAILED:
            return checkEmailFailedReducer(state, action as IFailedAction);

        case CHANGE_PASSWORD:
            return changePasswordReducer(state, action as IPasswordAction);
        case CHANGE_VERIFY:
            return changeVerifyReducer(state, action as IVerifyAction);
        case CHANGE_EMAIL:
            return changeEmailReducer(state, action as IEmailAction);
        case CHANGE_FIRST_NAME:
            return changeFirstNameReducer(state, action as IFirstNameAction);
        case CHANGE_FAMILY_NAME:
            return changeFamilyNameReducer(state, action as IFamilyNameAction);
        case CHANGE_IS_ON_DISPATCH:
            return changeIsOnDispatchReducer(state, action);

        case REGISTER_USER_SEND:
        case REGISTER_USER_VIA_FACEBOOK_SEND:
            return registerUserSendReducer(state, action);
        case REGISTER_USER_SUCCESS:
        case REGISTER_USER_VIA_FACEBOOK_SUCCESS:
            return registerUserSuccessReducer(state, action);
        case REGISTER_USER_FAILED:
        case REGISTER_USER_VIA_FACEBOOK_FAILED:
            return registerUserFailedReducer(state, action as IFailedAction);

        default:
            console.error(`Unhandled action! ${action.type}`);
            return state;
    }
}
