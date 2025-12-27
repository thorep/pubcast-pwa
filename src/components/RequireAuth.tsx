import { Navigate, useLocation } from "react-router";
import { useAuth } from "../auth";

type RequireAuthProps = {
    children: JSX.Element;
};

export default function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}
