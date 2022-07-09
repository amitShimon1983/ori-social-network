import { FunctionComponent } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
    user: { [key: string]: any } | undefined,
    children: React.ReactNode;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ user, children }) => {
    if (!user?.isAuthenticate) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;