import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Chip, Link } from "@heroui/react";
import Header from "../components/Header.jsx";

function PromptPreview({ prompt  }) {
    return (
        <Card shadow="sm" className="w-full">
            <CardHeader className="justify-between">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{prompt.title}</h3>
                    <Chip size="sm" variant="flat" className="w-fit mt-1">
                        {prompt.type}
                    </Chip>
                </div>
                <div className="hidden sm:flex gap-2 flex-wrap justify-end">
                    {prompt.tags?.slice(0, 4).map((tag) => (
                        <Chip key={tag} size="sm" variant="bordered">
                            {tag}
                        </Chip>
                    ))}
                </div>
            </CardHeader>

            <CardBody>
                <p className="text-default-600 line-clamp-2 whitespace-pre-wrap">
                    {prompt.prompt}
                </p>
            </CardBody>
        </Card>
    );
}

export default function Home() {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        fetch("http://localhost/server/api/prompts/getAll.php")
            .then((res) => res.json())
            .then((arr) =>
                Array.isArray(arr) ? setLatest(arr.slice(0, 3)) : setLatest([])
            );
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <Header />

            <section className="mt-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-semibold">Latest prompts</h2>
                    <Link to="/browse" color="foreground">
                        View all
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.map((prompt) => (
                        <PromptPreview key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            </section>
        </div>
    );
}
