import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

interface AuthenticatedRouteProps {
    children: React.ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.sign.isAuthenticated
    );

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return <>{children}</>;
};

export default AuthenticatedRoute;
