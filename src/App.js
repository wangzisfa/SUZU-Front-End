import {BrowserRouter, Route, Switch} from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";
import AuthRoute from "./component/AuthRoute";
import adminRoutes from "./routes/adminRoutes";
import React from "react";



export default class App extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <BrowserRouter >
                <Switch>
                    {publicRoutes.map(({path, component, ...route}) =>
                        <Route key={path} path={path} {...route} render={(routeProps) => {
                            // console.log(routeProps)
                            // console.log(component)
                            const Component = component;
                            return <Component {...routeProps} />
                        }}/>
                    )}
                    {privateRoutes.map(
                        (route) => <AuthRoute key={route.path} {...route} user={getAuthRoleFromLocalStorage()}/>
                    )}
                    {adminRoutes.map(
                        (route) => <AuthRoute key={route.path} {...route} user={getAuthRoleFromLocalStorage()} />
                    )}
                </Switch>
            </BrowserRouter>
        );
    }


}

function getAuthRoleFromLocalStorage() {
    return {
        auth: localStorage.getItem("authorization") ,
        role: localStorage.getItem("role")
    }
}

// const mapStateToProps = (state) => {
//     console.log(state);
//     return {
//         role: state.role ,
//         auth: state.auth
//     }
// }
//
// export default connect(mapStateToProps)(App)

