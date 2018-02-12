import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route} from "react-router"
import {BrowserRouter, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import {CompanyPage} from "./containers/CompanyPage";
import {MainPage} from "./containers/MainPage";
import {PasswordPage} from "./containers/PasswordPage";
import {ProductPage} from "./containers/ProductPage";
import {PromoPage} from "./containers/PromoPage";
import {PromoStatisticsPage} from "./containers/PromoStatisticsPage";
import {WelcomePage} from "./containers/WelcomePage";
import "./index.scss";
import reducer from "./reducers/index";

require("./sass/common.scss");
require("whatwg-fetch");

const store = createStore(reducer, applyMiddleware(thunk, createLogger()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MainPage match={undefined} location={undefined} history={undefined} dispatch={undefined}>
                <Switch>
                    <Route path="/welcome" component={WelcomePage}/>
                    <Route path="/companies" component={CompanyPage}/>
                    <Route path="/projects" component={ProductPage}/>
                    <Route path="/promos" component={PromoPage}/>
                    <Route path="/password" component={PasswordPage}/>
                    <Route path="/statistics" component={PromoStatisticsPage}/>
                </Switch>
            </MainPage>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root"),
);

// window.addEventListener("beforeunload", () => {
//     window["ws"].close();
// });
