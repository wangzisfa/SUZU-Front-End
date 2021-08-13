import HomePage from "../pages/base/HomePage";
import UserHomePage from "../pages/home";

const publicRoutes = [
    {
        path: '/' ,
        component: HomePage ,
        exact: true
    } ,
    {
        path: '/home' ,
        component:  UserHomePage ,
        exact: true ,
        role: 'user' ,
        backUrl: '/'
    }
]

export default publicRoutes;