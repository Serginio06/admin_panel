import * as React from "react";

export class WelcomePanel extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="welcomePanel__leftBar__Subcategory-wrapper">
                <div className="welcomePanel__section1">
                    <div className="welcomePanel__section__item">Messages</div>
                    <div className="welcomePanel__section__item-2">Notifications</div>
                    <div className="welcomePanel__section__item">Settings</div>
                </div>
                <div className="welcomePanel__section2">
                    <div className="welcomePanel__section__item">Companies</div>
                    <div className="welcomePanel__section__item">Products/Serivces</div>
                    <div className="welcomePanel__section__item">Promo Campaigns</div>
                    <div className="welcomePanel__section__item">Statistics</div>
                    <div className="welcomePanel__section__item">Clients</div>
                </div>
            </div>
        );
    }
}
