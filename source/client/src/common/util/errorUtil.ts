import {ErrorCode} from "../../../../types/constants/ErrorCode";

export function getErrorText(errorCode: string): string {

    switch (errorCode) {
        case ErrorCode.NOT_FOUND:
            return "User with this e-mail wasn't found";

        case ErrorCode.FACEBOOK_ID_NOT_FOUND:
            return "This facebook user isn't assigned to any Treasure user";

        case ErrorCode.BAD_REQUEST:
            return "Bad request error";

        case ErrorCode.DUPLICATE_ENTRY:
            return "Entered entity already present in database";

        case ErrorCode.AUTH_ERROR:
            return "Password is incorrect or user with this e-mail doesn't exist";

        case ErrorCode.WRONG_EXTENSION_ERROR:
            return "Wrong file extension. Should be one of png, jpg, jpeg or gif";

        case ErrorCode.SIZE_EXCEEDED_ERROR:
            return "Max image size 100KB. Please choose another image";

        case ErrorCode.EMAIL_NOT_UNIQUE:
            return "Email isn't unique";

        case ErrorCode.WEB_ADDRESS_NOT_UNIQUE:
            return "Web address isn't unique!";

        case ErrorCode.PHONE_NOT_UNIQUE:
            return "Phone number isn't unique!";

        case ErrorCode.EMAIL_NOT_VALID:
            return "Email isn't valid";

        case ErrorCode.FACEBOOK_ID_NOT_UNIQUE:
            return "User with this facebook profile is already registered!";

        default:
            return "Internal error :(";
    }
}
