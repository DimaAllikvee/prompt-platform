import React from "react";
import { Form, Input, Button, Card, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [message, setMessage] = React.useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const formUser = new FormData(e.currentTarget);

        try {
            const res = await fetch("http://localhost/server/auth/login.php", {
                method: "POST",
                body: formUser,
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("loggedIn", "true"); // запоминаем вход
                navigate("/"); // переход на главную
            } else {
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            setMessage("Ошибка соединения с сервером");
        }
    };

    const onReset = () => setMessage("");

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex items-center justify-center bg-default-100">
                <Image isZoomed alt="Login illustration" src="https://heroui.com/images/fruit-1.jpeg" width={500} className="rounded-lg shadow-lg" />
            </div>

            <div className="flex items-center justify-center bg-background px-6 py-12">
                <Card shadow="sm" className="w-full max-w-sm p-6 border border-default-200">
                    <Form className="w-full flex flex-col gap-4" onSubmit={onSubmit} onReset={onReset}>
                        <h1 className="text-2xl font-semibold text-center">Login</h1>

                        <Input isRequired name="email" type="email" label="Email" labelPlacement="outside" placeholder="Enter your Email" />
                        <Input isRequired name="password" type="password" label="Password" labelPlacement="outside" placeholder="Enter your password" />

                        <div className="flex gap-2">
                            <Button color="primary" type="submit" fullWidth>Submit</Button>
                            <Button type="reset" variant="flat" fullWidth>Reset</Button>
                        </div>

                        {message && <div className="text-small text-default-500 text-center">{message}</div>}
                    </Form>
                </Card>
            </div>
        </div>
    );
}


//https://www.heroui.com/docs/components/form