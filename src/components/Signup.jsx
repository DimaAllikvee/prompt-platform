import React from "react";
import {
    Card, CardHeader, CardBody, Button, Input, Link, Image,
} from "@heroui/react";
import {NavLink, useNavigate} from "react-router-dom";

export default function Signup() {
    const [message, setMessage] = React.useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const formUser = new FormData(event.currentTarget);

        try {
            const res = await fetch("http://localhost/server/auth/signup.php", {
                method: "POST",
                body: formUser,
            });
            const json = await res.json();
            if (json.success) {
                navigate("/login");
            } else {
                setMessage(json.message || "Signup failed");
            }
        } catch (error) {
            setMessage(error.message);
        }

    };


    const onReset = () => setMessage("");

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex items-center justify-center bg-default-100">
                <Image
                    isZoomed
                    alt="Sign up illustration"
                    src="https://heroui.com/images/fruit-4.jpeg"
                    width={520}
                    className="rounded-lg shadow-lg"
                />
            </div>

            <div className="flex items-center justify-center bg-background px-6 py-12">
                <Card shadow="sm" className="w-full max-w-sm" classNames={{base:"border border-default-200"}}>
                    <CardHeader className="flex flex-col gap-1 text-center">
                        <h1 className="text-2xl font-semibold">Create account</h1>
                        <p className="text-small text-default-500">Join PromptShare in seconds</p>
                    </CardHeader>

                    <CardBody>
                        <form onSubmit={onSubmit} onReset={onReset} className="flex flex-col gap-4">
                            <Input isRequired name="username" type="text" label="Username" labelPlacement="outside" placeholder="your_nickname" />
                            <Input isRequired name="email"    type="email" label="Email"    labelPlacement="outside" placeholder="you@example.com" />
                            <Input isRequired name="password" type="password" label="Password" labelPlacement="outside" placeholder="••••••••" />
                            <Input            name="confirm"  type="password" label="Confirm password" labelPlacement="outside" placeholder="••••••••" />

                            <Button color="primary" type="submit" fullWidth>
                                Sign Up
                            </Button>
                            <Button variant="flat" type="reset" fullWidth>
                                Reset
                            </Button>

                            {message && (
                                <div className="text-small text-default-500 text-center">{message}</div>
                            )}

                            <div className="text-small text-center text-default-500">
                                Already have an account?{" "}
                                <Link as={NavLink} to="/login" color="primary">Log in</Link>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

