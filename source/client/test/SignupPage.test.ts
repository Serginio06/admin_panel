import {Selector} from "testcafe";
import ReactSelector from "testcafe-react-selectors";
import {EMAIL_FOR_TESTING, FAMILY_NAME_FOR_TESTING, FIRST_NAME_FOR_TESTING, PASSWORD_FOR_TESTING} from "./constants";

const config = require("../../../config/index.json");

fixture`SignupPage`
    .page(`http://${config.domain}:${config.port}/signup`)
    .before(async (ctx) => {
        ctx.SignupPage = new SignupPage();
    })
;

type IReactSelector = ReactSelector & SelectorPromise & Selector;

interface ISigninPageController extends TestController {
    fixtureCtx: {
        SignupPage: SignupPage;
    }
}

export class SignupPage {
    public firstName: IReactSelector;
    public familyName: IReactSelector;
    public passwordInput: IReactSelector;
    public emailInput: IReactSelector;
    public retypePasswordInput: IReactSelector;
    public signInButton: IReactSelector;
    public managerBox: IReactSelector;

    constructor() {
        this.signInButton = ReactSelector("SignupPage SignupForm ModalDialog").find("[data-test-id=submit]");
        this.firstName = ReactSelector("SignupPage SignupForm ModalDialog Input").find("[data-test-id=firstName]");
        this.familyName = ReactSelector("SignupPage SignupForm ModalDialog Input").find("[data-test-id=familyName]");
        this.emailInput = ReactSelector("SignupPage SignupForm ModalDialog Input").find("[data-test-id=email]");
        this.passwordInput = ReactSelector("SignupPage SignupForm ModalDialog Input").find("[data-test-id=password]");
        this.retypePasswordInput = ReactSelector("SignupPage SignupForm ModalDialog Input").find("[data-test-id=retypePassword]");
        this.managerBox = ReactSelector("Navigation TopNavBar ManagerBox").find("[class*=ManagerBox__user]");
    }

    public async registration(t) {
        await t
            .expect(this.signInButton.hasAttribute("disabled")).ok()
            .typeText(this.firstName, FIRST_NAME_FOR_TESTING)
            .typeText(this.familyName, FAMILY_NAME_FOR_TESTING)
            .typeText(this.emailInput, EMAIL_FOR_TESTING)
            .typeText(this.passwordInput, PASSWORD_FOR_TESTING)
            .typeText(this.retypePasswordInput, PASSWORD_FOR_TESTING)
            .expect(this.signInButton.hasAttribute("disabled")).notOk()
        .click(this.signInButton)
        .expect(this.managerBox .innerText).eql(`FirstName FamilyName`);
    }
}

test("do registration", async (t: ISigninPageController) => {
    await t.fixtureCtx.SignupPage.registration(t);
});
