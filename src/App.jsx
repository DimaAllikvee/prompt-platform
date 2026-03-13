import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import CreatePrompt from "./pages/CreatePrompt";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return null;


    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }


    if (requiredRole) {
        const roles = user?.['https://my-app.com/roles'] || [];
        if (!roles.includes(requiredRole)) {
            return <Navigate to="/" />;
        }
    }

    return children;
};

function App() {
    const { isLoading, error } = useAuth0();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-medium">Загрузка системы защиты...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-danger">
                Ошибка авторизации: {error.message}
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>

                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="browse" element={<Browse />} />
                <Route path="login" element={<Login />} />


                <Route
                    path="create"
                    element={
                        <ProtectedRoute>
                            <CreatePrompt />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="admin"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;