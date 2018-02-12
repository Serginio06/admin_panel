import * as React from "react";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {loadCompanyPromoStatisticsAction} from "../actions";
import {PromoStatisticsForm} from "../components/statistics/PromoStatisticsForm";
import {StatisticPanel} from "../components/statistics/StatisticPanel";
import {IReduxProps} from "../../../../types/vendor";
import {IState} from "../state";
// import {PROMO_OBJECTIVES} from "../constants/promoObjectives";
import {ICompanyPromo, IPromoPageState} from "../state";
import {IPromoStatistics} from "../../../../types/entity";

const state2props = (state: IState): Partial<IPromoStatisticsPageProps> => ({
    companyId: state.navigationState.companyId,
    promoStatistics: state.statisticsPageState.promoStatistics,
    promos: state.promos,
    promoPageState: state.promoPageState,
});

const dispatch2props = (dispatch): Partial<IPromoStatisticsPageProps> => ({
    onLoadCompanyPromoStatistics: (companyId: string) => dispatch(loadCompanyPromoStatisticsAction(companyId)),
});

interface IPromoStatisticsPageProps extends IReduxProps {
    companyId: string;
    promoStatistics: IPromoStatistics[];
    promoPageState: IPromoPageState;
    promos: ICompanyPromo[];
    onLoadCompanyPromoStatistics: (id: string) => void;
}

interface IPromoStatisticsPageState {
    companyId: string;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class PromoStatisticsPage extends React.Component<IPromoStatisticsPageProps, IPromoStatisticsPageState> {
    constructor(props: IPromoStatisticsPageProps) {
        super(props);

        this.state = {
            companyId: "",
        };
    }

    public componentWillReceiveProps(nextProps: IPromoStatisticsPageProps): void {
        if (nextProps.companyId !== this.state.companyId) {
            if (nextProps.companyId && nextProps.companyId.length) {
                this.setState({
                    companyId: nextProps.companyId,
                });

                this.props.onLoadCompanyPromoStatistics(nextProps.companyId);
            }
        }
    }

    public render() {
        return (

            <div className="companyPage-wrapper">
                <div className="companyPage__panel_form-wrapper">
                    <StatisticPanel
                        {...this.props}
                    />
                </div>

                <div className="companyPage__mainContent-wrapper">
                    <PromoStatisticsForm statistics={this.props.promoStatistics}/>;
                </div>
            </div>
        )
    }
}
