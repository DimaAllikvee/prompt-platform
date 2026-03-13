import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-s85v3f7m25zny6lu.us.auth0.com"
            clientId="IVb55IwTLkeGq1gJ9Mwb3djMBt64xdSd"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}

            cacheLocation="localstorage"
            useRefreshTokens={true}
        >
            <BrowserRouter>
                <HeroUIProvider>
                    <App />
                </HeroUIProvider>
            </BrowserRouter>
        </Auth0Provider>
    </React.StrictMode>
);