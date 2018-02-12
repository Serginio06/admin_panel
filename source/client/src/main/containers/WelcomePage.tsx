import * as React from "react";
import {WelcomeForm} from "../components/welcome/WelcomeForm";
import {WelcomePanel} from "../components/welcome/WelcomePanel";

export interface IWelcomePageProps {}
export interface IWelcomePageState {}

export class WelcomePage extends React.Component<IWelcomePageProps, IWelcomePageState> {
    public render(): JSX.Element {
        return (
            <div className="companyPage-wrapper">
                <div className="companyPage__panel_form-wrapper">
                    <WelcomePanel/>
                </div>

                <div className="companyPage__mainContent-wrapper">
                    <WelcomeForm/>
                </div>
            </div>
        );
    }
}
