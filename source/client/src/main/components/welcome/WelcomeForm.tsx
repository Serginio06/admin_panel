import * as React from "react";

export class WelcomeForm extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className="block__full-width">

                <div className="welcomePage__form-wrapper">
                    <div className="welcomePage__form__title">
                        <h1 id="welcomePage__h1">Welcome! </h1>
                    </div>
                    <div className="welcomePage__content-wrapper">
                        <button className="welcomePage__content__item">
                            {"QUICK TOUR"}
                        </button>
                        <button className="welcomePage__content__item">
                            {"FAQ"}
                        </button>
                        <button className="welcomePage__content__item">
                            {"ASSIST"}
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}
