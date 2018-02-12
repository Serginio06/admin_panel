import * as block from "bem-cn";
import * as classnames from "classnames";
import * as React from "react";
import {Button} from "react-bootstrap";
import {getCookie} from "../../../common/util/cookieUtil";
import "./MainPage.scss";

const b = block("VerifyMainPage");
const f = block("VerifyMainPageForm");

export class MainPage extends React.Component<{}, {}> {

    public render(): JSX.Element {
        let message: string = getCookie("verifyMessage");

        if (!message) {
            message = "Something went wrong :(\nTry it again later";
        }

        return (
            <div className={classnames(b())}>
                <div className={classnames(b("wrapper")())}>
                    <div className={classnames(f())}>

                        <div className={f("content-wrapper")()}>

                            <div className={f("inputs-wrapper")()}>
                                {message}
                            </div>

                            <div className={f("btn-wrapper")()}>
                                <Button className={f("action-btn")()} onClick={this.onButtonClick}>
                                    {"Continue"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onButtonClick = (): void => {
        document.location.href = "/welcome";
    }
}
