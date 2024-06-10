import React from 'react';
import { Route,  Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import routes from './routes';
import PrivateRoutes from './PrivateRoutes';
import Login from '../components/auth/Login';
import { WithHeader } from './withHeader';
import profile from '../components/profile/Profile';
import Register from '../components/auth/Register';
import { RootState } from '../state_Management/store/store';
import { useSelector } from 'react-redux';



const PublicRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated);
    // const isAuthenticated = true;
    // const disptach = useDispatch()
    // const LogoutHandler = () => {
    //   disptach(logOutAction())

    // }
    return (
        <div>
            <Routes>
                <Route
                    path={routes.HOME}
                    element={<WithHeader component={Home} route={routes.HOME} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    path={routes.LOGIN}
                    element={<WithHeader component={Login} route={routes.LOGIN} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    path={routes.REGISTER}
                    element={<WithHeader component={Register} route={routes.REGISTER} isAuthenticated={isAuthenticated} />}
                />
                <Route
                    element={<PrivateRoutes isAuthenticated={isAuthenticated} />}
                >
                    {/* <Route
                        path={routes.MYORDERS}
                        element={<WithHeader component={MyOrders} route={routes.MYORDERS} isAuthenticated={isAuthenticated} />}
                    /> */}
                    <Route
                        path={routes.MYPROFILE}
                        element={<WithHeader component={profile} route={routes.MYPROFILE} isAuthenticated={isAuthenticated} />}
                    />
                </Route>
                {/* <Route
          path={routes.MYORDERS}
          element={<WithHeader component={MyOrders} route={routes.MYORDERS} isAuthenticated={isAuthenticated} onLogout={LogoutHandler } />}
        />
        <Route
          path={routes.MYPROFILE}
          element={<WithHeader component={profile} route={routes.MYPROFILE} isAuthenticated={isAuthenticated} onLogout={LogoutHandler } />}
        /> */}
            </Routes>
        </div>
    );
};

export default PublicRoutes;
