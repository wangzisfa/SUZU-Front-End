import AdminHome from "../pages/admin/AdminHome";


const privateRoutes = [
    {
        path: '/admin' ,
        component:  AdminHome,
        exact: true ,
        role: 'admin' ,
        backUrl: '/'
    }
]
export default privateRoutes;