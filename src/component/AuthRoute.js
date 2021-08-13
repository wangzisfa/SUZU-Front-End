import {Redirect, Route} from "react-router-dom";
import {isTokenExpired} from "../requests/query";

export default function AuthRoute(props) {
    const {
        user: {
            role: userRole ,
            auth: auth
        },
        role: routeRole,
        backUrl: backUrl,
        ...otherProps
    } = props;

    /*
    * 从localStorage里面获取 auth 然后判断是否一致
    * */
    // let data = getAuthRoleFromLocalStorage();
    // console.log(data);
    //
    //
    //
    // console.log("user role: " + userRole);
    // console.log("route role: " + routeRole);
    // console.log(auth)
    // console.log(props)


    console.log(props);
    // return <Route {...otherProps} />

    if (userRole && userRole === routeRole) {
        if (isTokenExpired(auth)) {
            console.log("to");
            localStorage.removeItem("authorization");
            localStorage.removeItem("role");
            return <Redirect to={backUrl} />
        } else {
            console.log("here")
            return <Route {...otherProps} />
        }
    } else {
        return <Redirect to={backUrl} />
    }
}
