interface ISigninPageState {
    email: string;
    errorCode: string;
    failed: boolean;
    keepLogged: boolean;
    password: string;
    show: boolean;
}

export interface IRecoverPageState {
    email: string;
    errorCode: string;
    failed: boolean;
    show: boolean;
    sent: boolean;
}

export interface ISignupPageState {
    email: string;
    emailCheckFailed: boolean;
    emailChecked: boolean;
    emailValidationLevel: string;
    emailValidationMessage: string;
    errorCode: string;
    failed: boolean;
    firstName: string;
    firstNameValidationLevel: string;
    firstNameValidationMessage: string;
    familyName: string;
    familyNameValidationLevel: string;
    familyNameValidationMessage: string;
    position: string;
    positionValidationLevel: string;
    positionValidationMessage: string;
    show: boolean;
    password: string;
    passwordValidationLevel: string;
    passwordValidationMessage: string;
    verify: string;
    verifyValidationLevel: string;
    verifyValidationMessage: string;

    isOnDispatch: boolean;
}

export interface IState {
    signinPageState: ISigninPageState;
    recoverPageState: IRecoverPageState;
    signupPageState: ISignupPageState;
}

export const initState: IState = {
    signinPageState: {
        email: "",
        errorCode: "",
        failed: false,
        keepLogged: false,

        password: "",
        show: true,

    },

    recoverPageState: {
        email: "",
        errorCode: "",
        failed: false,
        show: false,

        sent: false,
    },

    signupPageState: {
        email: "",
        emailCheckFailed: false,
        emailChecked: false,
        emailValidationLevel: "",
        emailValidationMessage: "",
        errorCode: "",
        failed: false,

        firstName: "",
        firstNameValidationLevel: "",
        firstNameValidationMessage: "",

        familyName: "",
        familyNameValidationLevel: "",
        familyNameValidationMessage: "",

        position: "",
        positionValidationLevel: "",
        positionValidationMessage: "",
        show: false,

        password: "",
        passwordValidationLevel: "",
        passwordValidationMessage: "",

        verify: "",
        verifyValidationLevel: "",
        verifyValidationMessage: "",

        isOnDispatch: false,
    },
};
