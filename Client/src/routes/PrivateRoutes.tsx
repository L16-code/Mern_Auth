import { Navigate, Outlet } from 'react-router-dom';
import { ProtectedRoutesProps } from '../interfaces/authInterface';
import { useSelector } from 'react-redux';
import { RootState } from '../state_Management/store/store';
import jwt_decode from 'jwt-decode';
interface TokenPayload {
    exp: number; 
}
const PrivateRoutes:React.FC<ProtectedRoutesProps> = ({isAuthenticated, children}) => {
    // const token=useSelector
  const TOKEN = useSelector((state: RootState) => state.root.token);
//   const isTokenExpired = (token: string) => {
//     try {
//         const decoded: TokenPayload = jwt_decode(token);
//         const currentTime = Date.now() / 1000; // Convert to seconds
//         return decoded.exp < currentTime;
//     } catch (error) {
//         console.error('Failed to decode token:', error);
//         return true;
//     }  
// };
    if (!isAuthenticated || !TOKEN) {
        return <Navigate to="/login" />;
    }

    return children ? <>{children}</> : <Outlet />;
}

export default PrivateRoutes