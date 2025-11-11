import { Button } from "@heroui/react";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <section className="py-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
                Share and find AI prompts
            </h1>

            <p className="mt-3 text-default-600">
                Prompts for ChatGPT, Midjourney, Sora - with tags, types and quick copy.
            </p>

            <div className="mt-6 flex gap-3 justify-center">
                <Button as={NavLink} to="/browse" color="primary">
                    Browse
                </Button>
                <Button as={NavLink} to="/create" variant="flat">
                    Create
                </Button>
            </div>
        </section>
    );
}
