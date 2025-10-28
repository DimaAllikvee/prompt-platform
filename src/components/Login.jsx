import React from "react";
import { Form, Input, Button, Card, Image } from "@heroui/react";

export default function Login() {
    const [action, setAction] = React.useState(null);

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
                <Card shadow="sm" className="w-full max-w-sm p-6 border border-default-200">
                    <Form
                        className="w-full flex flex-col gap-4"
                        onReset={() => setAction("reset")}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = Object.fromEntries(new FormData(e.currentTarget));
                            setAction(`submit ${JSON.stringify(data)}`);
                        }}
                    >
                        <h1 className="text-2xl font-semibold text-center">Login</h1>

                        <Input
                            isRequired
                            errorMessage="Please enter a valid email"
                            label="Email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Enter your Email"
                            type="email"
                        />

                        <Input
                            isRequired
                            errorMessage="Please enter a valid password"
                            label="Password"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <div className="flex gap-2">
                            <Button color="primary" type="submit" fullWidth>
                                Submit
                            </Button>
                            <Button type="reset" variant="flat" fullWidth>
                                Reset
                            </Button>
                        </div>

                        {action && (
                            <div className="text-small text-default-500 text-center">
                                Action: <code>{action}</code>
                            </div>
                        )}
                    </Form>
                </Card>
            </div>
        </div>
    );
}

//https://www.heroui.com/docs/components/form