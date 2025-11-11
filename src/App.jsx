import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Browse from "./pages/Browse.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CreatePrompt from "./pages/CreatePrompt.jsx";

export default function App() {
    return (

        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Navigate to="/browse" replace />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create" element={<CreatePrompt />} />
            </Route>
        </Routes>
    );
}
