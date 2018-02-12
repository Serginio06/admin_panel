import * as block from "bem-cn";
import * as classnames from "classnames";
import * as React from "react";
import "./ManagerBox.scss";

const b = block("ManagerBox");
const dropFiles = require("../../../../resources/icons/dropFiles.png");

export interface IManagerBoxProps {
    logo: string;
    name: string;
    userName: string;
    offerPhrase?: string;
    fontClass?: string;
}

export class ManagerBox extends React.Component<IManagerBoxProps> {

    public render() {
        const {
            logo,
            name,
            userName,
            offerPhrase,
            fontClass,
        } = this.props;

        const image: JSX.Element = logo ? <img src={logo} alt="logo" className={b("image")()}/> : <div className={b("image-empty")()}/>;

        return (
            <div className={b()}>
                {image}
                <div className={classnames(fontClass, b("wrapper")())}>
                    {name ? <div className={b("name")()}>
                            {name}
                        </div>
                        : <div className={b("noname")()}>
                            {"Add company"}
                        </div>
                    }
                    <div
                        className={b("user")()}
                        title={userName || offerPhrase}
                        style={{marginRight: 15}}
                    >
                        {userName || offerPhrase}
                    </div>
                </div>
            </div>
        );
    }
}
