import {Selector} from "testcafe";
import * as RS from "testcafe-react-selectors";

export type IReactSelector = RS & SelectorPromise & Selector;
export const ReactSelector = RS;

export const EMAIL_FOR_TESTING = "email.for@testing.io";
export const PASSWORD_FOR_TESTING = "Pa$$w0rd";
export const FIRST_NAME_FOR_TESTING = "FirstName";
export const FAMILY_NAME_FOR_TESTING = "FamilyName";
