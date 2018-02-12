/// <reference path="./facebook.d.ts"/>

export function useFacebookData(dispatchCallback: (id: string, name: string, keepLogged?: boolean) => void, keepLogged: boolean): void {
    FB.getLoginStatus((response: IFacebookUserAuthenticate) => {
        if (response.authResponse) {
            FB.api("/me", "get", (getResponse: IFacebookAPIUserResponse) => {
                dispatchCallback(getResponse.id, getResponse.name, keepLogged);
            });
        } else {
            FB.login((loginResponse: IFacebookUserAuthenticate) => {
                if (loginResponse.authResponse) {
                    FB.api("/me", "get", (loginGetResponse: IFacebookAPIUserResponse) => {
                        dispatchCallback(loginGetResponse.id, loginGetResponse.name, keepLogged);
                    });
                }
            });
        }
    });
}

export function useFacebookDataLogin(dispatchCallback: (id: string, keepLogged: boolean) => void, keepLogged: boolean): void {
    FB.getLoginStatus((response: IFacebookUserAuthenticate) => {
        if (response.authResponse) {
            FB.api("/me", "get", (getResponse: IFacebookAPIUserResponse) => {
                dispatchCallback(getResponse.id, keepLogged);
            });
        } else {
            FB.login((loginResponse: IFacebookUserAuthenticate) => {
                if (loginResponse.authResponse) {
                    FB.api("/me", "get", (loginGetResponse: IFacebookAPIUserResponse) => {
                        dispatchCallback(loginGetResponse.id, keepLogged);
                    });
                }
            });
        }
    });
}
