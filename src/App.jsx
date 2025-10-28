import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PromptList from "./components/PromptList.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import CreatePrompt from "./components/CreatePrompt.jsx";

export default function App() {
    return (

        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Navigate to="/browse" replace />} />
                <Route path="/browse" element={<PromptList />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create" element={<CreatePrompt />} />
            </Route>
        </Routes>
    );
}
