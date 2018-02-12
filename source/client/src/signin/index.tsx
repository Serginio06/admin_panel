import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore, Store} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import {MainPage} from "./containers/MainPage";
import {RecoverPage} from "./containers/RecoverPage";
import {SigninPage} from "./containers/SigninPage";
import {SignupPage} from "./containers/SignupPage";
import reducer from "./reducers/index";
import "./sass/common.scss";
import {IState} from "./state";

require("whatwg-fetch");

const store: Store<IState> = createStore(reducer, applyMiddleware(thunk, createLogger()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MainPage match={undefined} location={undefined} history={undefined} dispatch={undefined}>
                <Switch>
                    <Route path="/signup" component={SignupPage}/>
                    <Route path="/recover" component={RecoverPage}/>
                    <Route path="/signin/signup" component={SignupPage}/>
                    <Route path="/signin/recover" component={RecoverPage}/>
                    <Route component={SigninPage}/>
                </Switch>
            </MainPage>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root"),
);

// window.addEventListener("beforeunload", () => {
//     window["ws"].close();
// });
