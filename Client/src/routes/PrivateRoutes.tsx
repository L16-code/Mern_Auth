import { Navigate, Outlet } from 'react-router-dom';
import { ProtectedRoutesProps } from '../interfaces/authInterface';

const PrivateRoutes:React.FC<ProtectedRoutesProps> = ({isAuthenticated, children}) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children ? <>{children}</> : <Outlet />;
}

export default PrivateRoutes