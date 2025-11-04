import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,
} from "@heroui/react";
import React from "react";

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
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);


    React.useEffect(() => {
        const logged = localStorage.getItem("loggedIn") === "true";
        setIsLoggedIn(logged);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <>
            <Navbar maxWidth="xl">
                <NavbarBrand className="gap-2">
                    <AcmeLogo />
                    <p className="font-bold text-inherit">ACME</p>
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
                </NavbarContent>

                <NavbarContent justify="end">
                    {!isLoggedIn ? (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Link as={NavLink} to="/login">Login</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button as={NavLink} to="/signup" color="primary" variant="flat">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    ) : (
                        <NavbarItem>
                            <Button color="danger" variant="flat" onPress={handleLogout}>
                                Logout
                            </Button>
                        </NavbarItem>
                    )}
                </NavbarContent>
            </Navbar>

            <main className="max-w-5xl mx-auto p-4">
                <Outlet />
            </main>
        </>
    );
}
