// import "../index.scss"
import * as React from "react";
import {RouteComponentProps} from "react-router";
import {loadUserInfoAction, logoutAction} from "../../common/actions";
import {Navigation} from "../../common/components/Navigation/Navigation";
import {getCookie, setCookie} from "../../common/util/cookieUtil";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {
    chooseCookiedCompanyAction,
    loadCompanyProductsAction,
    loadCompanyPromosAction,
    loadCompanyPromoStatisticsAction,
    loadUsersCompaniesAction,
} from "../actions";
import {PageType} from "../constants/PageType";
import {ICookiedCompany, INavigationState, IPromoPageState, IState} from "../state";
import {IReduxProps} from "../../../../types/vendor";

interface IMainPageProps extends RouteComponentProps<any>, IReduxProps {
    promoPageState?: IPromoPageState;
    navigationState?: INavigationState;
    userCompanies?: any[];
    companyProducts?: any[];

    onLoadUserCompanies?: () => void;
    onLoadUserInfo?: () => void;
    onChooseCookiedCompany?: (company) => void;
    onLoadCompanyProducts?: (id) => void;
    onLoadCompanyPromos?: (id) => void;
    onLoadCompanyPromoStatistics?: (id) => void;

    onLogout?: () => void;
}

interface IMainPageState {
    companyId: string;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class MainPage extends React.Component<IMainPageProps, IMainPageState> {
    private _timer: any;

    constructor(props: IMainPageProps) {
        super(props);
        this.state = {
            companyId: "0",
        }
    }

    public componentDidMount(): void {
        this.props.onLoadUserInfo();
        this.props.onLoadUserCompanies();

        if (getCookie("company")) {
            const company: string = getCookie("company");
            let companyObj: ICookiedCompany;

            try {
                companyObj = JSON.parse(company);

                if (companyObj !== null) {
                    this.props.onChooseCookiedCompany(companyObj);
                    this.props.onLoadCompanyProducts(companyObj.id);
                    this.props.onLoadCompanyPromos(companyObj.id);
                    this.props.onLoadCompanyPromoStatistics(companyObj.id);
                }
            } catch (error) {
                setCookie("company", null);
            }
        }
    }

    public componentWillReceiveProps(nextProps: IMainPageProps): void {
        const companyId: string = nextProps.navigationState.companyId;

        if (this.state.companyId !== companyId) {
            clearInterval(this._timer);

            this.setState({companyId});

            if (companyId && companyId !== "0") {
                // this._timer = setInterval((): void => {
                //     this.props.onLoadCompanyPromoStatistics(companyId);
                // }, 3000); //@todo take me from here plz
            }
        }
    }

    public render(): JSX.Element {
        let currentPage: PageType;
        const location: string = document.location.href;

        if (location.indexOf("/welcome") !== -1) {
            currentPage = PageType.WELCOME;
        } else if (location.indexOf("/companies") !== -1) {
            currentPage = PageType.COMPANY;
        } else if (location.indexOf("/projects") !== -1) {
            currentPage = PageType.PRODUCT;
        } else if (location.indexOf("/password") !== -1) {
            currentPage = PageType.PASSWORD;
        } else if (location.indexOf("/promos") !== -1) {
            currentPage = PageType.PROMO;
        } else if (location.indexOf("/statistics") !== -1) {
            currentPage = PageType.PROMO_STATISTICS;
        } else {
            document.location.href = "/welcome";
        }

        return (
            <div className="mainPage">
                <Navigation
                    currentPage={currentPage}

                    history={this.props.history}

                    userName={this.props.navigationState.userName}
                    name={this.props.navigationState.name}
                    logo={this.props.navigationState.logo}
                    companyId={this.props.navigationState.companyId}

                    userCompanies={this.props.userCompanies}
                    companyProducts={this.props.companyProducts}
                    promoPageState={this.props.promoPageState}

                    onLogout={this.props.onLogout}
                >
                    {this.props.children}
                </Navigation>
            </div>
        );
    }
}

function state2props(state: IState) {
    return {
        companyProducts: state.companyProducts,
        navigationState: state.navigationState,
        promoPageState: state.promoPageState,
        userCompanies: state.userCompanies,
    };
}

function dispatch2props(dispatch) {
    return {
        onChooseCookiedCompany: (company) => dispatch(chooseCookiedCompanyAction(company)),
        onLoadCompanyProducts: (companyId: string) => dispatch(loadCompanyProductsAction(companyId)),
        onLoadCompanyPromoStatistics: (companyId: string) => dispatch(loadCompanyPromoStatisticsAction(companyId)),
        onLoadCompanyPromos: (companyId: string) => dispatch(loadCompanyPromosAction(companyId)),
        onLoadUserCompanies: () => dispatch(loadUsersCompaniesAction()),
        onLoadUserInfo: () => dispatch(loadUserInfoAction()),
        onLogout: () => dispatch(logoutAction()),
    };
}
