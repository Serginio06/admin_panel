import * as React from "react";
import {FormControl, FormGroup, InputGroup} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Color} from "../../constants/Color";
import {ManagerBox} from "../ManagerBox/ManagerBox";

interface ITopNavBarProps {
    logo: string;
    userName: string;
    name: string;
}

export class TopNavBar extends React.Component<ITopNavBarProps> {

    public static defaultProps: ITopNavBarProps = {
        logo: require("../../../../resources/icons/dropFiles.png"),
        name: "Add company",
        userName: "Sign in",
    };

    public render(): JSX.Element {
        const diamondWhite: string = require("../../../../resources/icons/svg/diamondWhite2.svg");
        const search: string = require("../../../../resources/icons/svg/search.svg");

        const logo: string = this.props.logo;

        const userName: string = this.props.userName,
            name: string = this.props.name;

        return (
            <div className="navPage__topBar-wrapper">
                <div className="navPage__topBar__leftSide-wrapper">
                    <div className="navPage__topBar__logo-wrapper">
                        <SVGInline
                            svg={diamondWhite}
                            fill={Color.WHITE}
                            width="25px"
                            height="22px"
                            className="navPage__topBar__logo-img"
                        />
                        <div className="navPage__topBar__logo__siteName-wrapper">
                            <div className="navPage__topBar__siteName__topRow">treasure</div>
                            <div className="navPage__topBar__siteName__bottomRow">systems</div>
                        </div>
                    </div>
                </div>

                <div className="navPage__topBar__rightSide-wrapper">
                    <div className="navPage__topBar__rightSide__searchInput-wrapper">
                        <FormGroup>
                            <InputGroup>
                                <SVGInline
                                    svg={search}
                                    fill={Color.GREY_LIGHT}
                                    width="17px"
                                    height="17px"
                                    className="navPage__topBar__rightSide__searchInput-img"
                                />
                                <FormControl
                                    className="navPage__topBar__rightSide__searchInput-input"
                                    type="text"
                                />
                            </InputGroup>
                        </FormGroup>
                    </div>

                    <ManagerBox
                        logo={logo}
                        name={name}
                        userName={userName}
                    />
                </div>
            </div>
        );
    }
}
