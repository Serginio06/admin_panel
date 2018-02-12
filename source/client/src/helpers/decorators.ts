import {connect} from "react-redux";
import {withRouter} from "react-router";

export function reduxConnect(mapStateToProps: any, mapDispatchToProps: any) {
    return (target: any) => {
        return (connect(mapStateToProps, mapDispatchToProps)(target)) as any;
    }
}

export function routerConnect() {
    return (target: any) => {
        return withRouter(target) as any;
    }
}
