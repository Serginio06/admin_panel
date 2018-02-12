import {Selector} from "testcafe";
import ReactSelector from "testcafe-react-selectors";
import {EMAIL_FOR_TESTING, PASSWORD_FOR_TESTING} from "./constants";

const config = require("../../../config/index.json");

fixture`SigninPage`
    .page(`http://${config.domain}:${config.port}/signin`)
    .before(async (ctx) => {
        ctx.SigninPage = new SigninPage();
    })
;

type IReactSelector = ReactSelector & SelectorPromise & Selector;

interface ISigninPageController extends TestController {
    fixtureCtx: {
        SigninPage: SigninPage;
    }
}

export class SigninPage {
    public loginInput: IReactSelector;
    public passwordInput: IReactSelector;
    public signInButton: IReactSelector;
    public alert: IReactSelector;

    constructor() {
        this.signInButton = ReactSelector("SigninPage SigninForm ModalDialog").find("button[class*=form__content__actionBtn]");
        this.loginInput = ReactSelector("SigninPage SigninForm ModalDialog Input").find("input[type=text]");
        this.passwordInput = ReactSelector("SigninPage SigninForm ModalDialog Input").find("input[type=password]");
        this.alert = ReactSelector("SigninPage SigninForm ModalDialog Alert");
    }

    public async wrongLogin(t) {
        await t
            .expect(this.signInButton.hasAttribute("disabled")).ok()
            .typeText(this.loginInput, "wrong-" + EMAIL_FOR_TESTING)
            .typeText(this.passwordInput, PASSWORD_FOR_TESTING)
            .expect(this.signInButton.hasAttribute("disabled")).notOk()
            .click(this.signInButton)
            .expect(this.alert.innerText).eql(`Password is incorrect or user with this e-mail doesn't exist\n`);
    }
}

test("do wrong login", async (t: ISigninPageController) => {
    await t.fixtureCtx.SigninPage.wrongLogin(t);
});
