import React from "react";
import { Button, Card, Image } from "@heroui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
    const { loginWithRedirect, isLoading } = useAuth0();


    const handleLogin = () => {
        loginWithRedirect();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Загрузка системы авторизации...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

            <div className="hidden md:flex items-center justify-center bg-default-100">
                <Image
                    isZoomed
                    alt="Login illustration"
                    src="https://heroui.com/images/fruit-1.jpeg"
                    width={500}
                    className="rounded-lg shadow-lg"
                />
            </div>


            <div className="flex items-center justify-center bg-background px-6 py-12">
                <Card shadow="sm" className="w-full max-w-sm p-8 border border-default-200 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4 text-center">Welcome</h1>

                    <p className="text-default-500 text-center mb-8">
                        Для доступа к платформе, пожалуйста, используйте безопасный вход через Auth0.
                    </p>

                    <Button
                        color="primary"
                        size="lg"
                        fullWidth
                        onClick={handleLogin}
                        className="font-semibold"
                    >
                        Log In / Sign Up
                    </Button>

                    <p className="text-tiny text-default-400 mt-6 text-center">
                        Auth0
                    </p>
                </Card>
            </div>
        </div>
    );
}