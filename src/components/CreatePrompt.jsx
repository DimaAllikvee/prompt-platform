import {useState, useEffect} from "react";
import {Input, Textarea, Button} from "@heroui/react";
import {useNavigate} from "react-router-dom";

export default function CreatePrompt() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("text");
    const [tagsText, setTagsText] = useState("");
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn") === "true";
        if (!loggedIn) {
            navigate("/login");
        }
    }, [navigate]);

    const save = async (e) => {
        e.preventDefault();
        await fetch("http://localhost/server/api/prompts/createPrompt.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                slug: title,
                title,
                type,
                tags: tagsText,
                prompt,
                user_id: localStorage.getItem("user_id"),
            }),
        });
        navigate("/browse?ts=" + Date.now());
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Share Prompt</h1>

            <form onSubmit={save} className="flex flex-col gap-4">
                <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} />

                <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                        className="border rounded-md px-3 py-2 w-full"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value="video">video</option>
                        <option value="storyboard">storyboard</option>
                        <option value="text">text</option>
                    </select>
                </div>

                <Input
                    label="Tags (comma separated)"
                    placeholder="anime, intro, Sora2"
                    value={tagsText}
                    onChange={e => setTagsText(e.target.value)}
                />

                <Textarea
                    label="Prompt"
                    minRows={8}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                />

                <div className="flex justify-end">
                    <Button color="primary" type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}
