import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PromptList from "./components/PromptList.jsx";



export default function App() {
    return (

        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Navigate to="/browse" replace />} />
                <Route path="/browse" element={<PromptList />} />
            </Route>
        </Routes>
    );
}
