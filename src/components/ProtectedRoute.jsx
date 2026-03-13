import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (requiredRole) {
        const roles = user?.['https://my-app.com/roles'] || [];
        if (!roles.includes(requiredRole)) {
            return <Navigate to="/" />;
        }
    }

    return children;
};