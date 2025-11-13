import PromptCard from "../components/PromptCard.jsx";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

export default function Browse() {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        fetch("http://localhost/server/api/prompts/getAll.php")
            .then((res) => res.json())
            .then((data) => setPrompts(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (prompts.length === 0) return <div>No data found</div>;


    const filteredPrompts = selectedTag
        ? prompts.filter((prompt) => prompt.tags.includes(selectedTag))
        : prompts;


    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
            <h1 style={{ marginBottom: 12 }}>Browse Prompts</h1>

            <div style={{ display: "grid", gap: 12 }}>
                {filteredPrompts.map((prompt) => (
                    <PromptCard
                        key={prompt.id}
                        title={prompt.title}
                        type={prompt.type}
                        tags={prompt.tags}
                        prompt={prompt.prompt}
                        onTagClick={(tag) => setSelectedTag(tag)}
                        authorName={prompt.author_name}
                        createdAt={prompt.created_at}
                    />
                ))}
            </div>
        </div>
    );
}
