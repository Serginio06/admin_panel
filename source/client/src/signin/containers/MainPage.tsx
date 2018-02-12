import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Navigation} from "../../common/components/Navigation/Navigation";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {IState} from "../state";
import {IReduxProps} from "../../../../types/vendor";

export interface ISignInMainPageProps extends IReduxProps, RouteComponentProps<any> {
}

@routerConnect()
@reduxConnect((state: IState): Partial<ISignInMainPageProps> => ({}), (dispatch): Partial<ISignInMainPageProps> => ({}))
export class MainPage extends React.Component<ISignInMainPageProps, {}> {
    constructor(props: ISignInMainPageProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div style={{height: "100%"}}>
                <Navigation>
                    {this.props.children}
                </Navigation>
            </div>
        );
    }
}
