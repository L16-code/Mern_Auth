const routes = {

    HOME: '/',
    LOGIN: '/login',
    REGISTER: "/register",
    MYPROFILE: '/profile'

}


export const beforeLoginRoutes = [
    routes.HOME,
    routes.LOGIN,
]

export default routes;