import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { Navigate } from "react-router";
import { appContextVar } from "../../../services/store";

interface ProtectedRouteProps {
    user: { [key: string]: any } | undefined,
    children: React.ReactNode;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ user, children }) => {
    const { isAuthenticate } = useReactiveVar(appContextVar);
    if (!isAuthenticate) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;