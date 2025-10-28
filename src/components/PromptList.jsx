import PromptCard from "./PromptCard.jsx";
import { useEffect, useState } from "react";
import {Pagination} from "@heroui/react";
const PromptList = () => {
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost/server/api/prompts/getAll.php")
            .then((res) => res.json())
            .then((data) => setPrompts(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (prompts.length === 0) return <div>No data found</div>;

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
            <h1 style={{ marginBottom: 12 }}>Browse Prompts</h1>

            <div style={{ display: "grid", gap: 12 }}>
                {prompts.map((p) => (
                    <PromptCard
                        key={p.id}
                        title={p.title}
                        type={p.type}
                        tags={p.tags}
                        prompt={p.prompt}
                    />
                ))}
            </div>
        </div>
    );
};





export default PromptList;


