import { NavLink, Outlet } from "react-router-dom";
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, User
} from "@heroui/react";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer.jsx";

function AcmeLogo() {
    return (
        <svg fill="none" height="28" viewBox="0 0 32 32" width="28">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
}

export default function Layout() {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();


    //  console.log("ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ИЗ AUTH0:", user);


    const isAdmin = user && user['https://my-app.com/roles']?.includes('admin');

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return (
        <>
            <Navbar maxWidth="xl" isBordered>
                <NavbarBrand className="gap-2">
                    <NavLink to="/" className="flex items-center gap-2">
                        <AcmeLogo />
                        <p className="font-bold text-inherit">ACME</p>
                    </NavLink>
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link as={NavLink} to="/home" color="foreground">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link as={NavLink} to="/browse" color="foreground">
                            Browse
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link as={NavLink} to="/create" color="foreground">
                            Share Prompt
                        </Link>
                    </NavbarItem>


                    {isAdmin && (
                        <NavbarItem>
                            <Link as={NavLink} to="/admin" className="text-danger font-bold border-l-2 pl-4 border-default-200">
                                Admin Panel
                            </Link>
                        </NavbarItem>
                    )}
                </NavbarContent>

                <NavbarContent justify="end">
                    {!isAuthenticated ? (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Button variant="light" onClick={() => loginWithRedirect()}>
                                    Login
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button
                                    color="primary"
                                    variant="flat"
                                    onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })}
                                >
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <User
                                name={user.nickname || user.name}
                                description={user.email}
                                avatarProps={{
                                    src: user.picture,
                                    size: "sm",
                                    isBordered: true,
                                    color: isAdmin ? "danger" : "primary"
                                }}
                            />
                            <Button
                                color="danger"
                                variant="flat"
                                size="sm"
                                onPress={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                </NavbarContent>
            </Navbar>

            <main className="max-w-5xl mx-auto p-4 min-h-[calc(100vh-150px)]">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}